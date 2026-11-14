import React from "react"
import type {GetStaticPaths, GetStaticProps} from "next"
import Link from "next/link"

import Layout from "../../components/Layout"
import Tag from "../../components/Tag"
import {cv, experiences, getExperience, getNeighbors} from "../../lib/cv"
import type {Experience} from "../../types/cv"

const knownSkills = new Set(cv.skills.flatMap((g) => g.items))

// Link a stack tag back to the home skill filter when it maps to a listed skill.
function skillFor(tag: string): string | undefined {
    if (knownSkills.has(tag)) return tag
    return Array.from(knownSkills).find((s) => tag.startsWith(`${s} `))
}

function Bullets({items}: { items: string[] }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-yellow-300" aria-hidden/>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}

function NeighborLink({experience, direction}: { experience?: Experience, direction: "prev" | "next" }) {
    if (!experience) return <div className="hidden sm:block"/>
    const isNext = direction === "next"
    return (
        <Link href={`/experience/${experience.slug}`}>
            <a className={`group block rounded-lg border border-white/10 p-4 transition-colors hover:border-blue-400 ${isNext ? "sm:text-right" : ""}`}>
                <span className="font-mono text-xs text-gray-500">{isNext ? "Newer →" : "← Older"}</span>
                <span className="mt-1 block font-semibold text-white group-hover:text-blue-300">{experience.role}</span>
                <span className="block text-sm text-gray-400">{experience.company} · {experience.period}</span>
            </a>
        </Link>
    )
}

interface Props {
    experience: Experience
    prev?: Experience | null
    next?: Experience | null
}

export default function ExperiencePage({experience, prev, next}: Props) {
    const {role, company, companyFull, period, location, summary, projects, highlights, stack} = experience

    return (
        <Layout title={`${role} · ${company}`} description={summary || highlights[0]}>
            <article className="pt-8 sm:pt-12">
                <Link href="/#experience">
                    <a className="font-mono text-sm text-gray-400 hover:text-blue-300">← All experience</a>
                </Link>

                <header className="mt-6 border-b border-white/10 pb-8">
                    <p className="font-mono text-sm text-green-500">{period}</p>
                    <h1 className="mt-2 font-mono text-3xl text-white sm:text-4xl">{role}</h1>
                    <p className="mt-2 text-lg text-blue-400">{companyFull || company}</p>
                    <p className="mt-1 text-sm text-gray-500">{location}</p>
                </header>

                <div className="mt-8 grid gap-10 lg:grid-cols-detail">
                    <div className="min-w-0 space-y-10 text-gray-300">
                        {summary && <p className="text-lg leading-relaxed text-gray-200">{summary}</p>}

                        {projects?.map((project) => (
                            <section key={project.name} className="rounded-xl border border-white/10 bg-ink-700/40 p-5 sm:p-6">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                    <h2 className="font-mono text-xl text-white">
                                        {project.name}
                                        <span className="text-gray-400"> · {project.subtitle}</span>
                                    </h2>
                                    <span className="font-mono text-sm text-gray-500">{project.period}</span>
                                </div>
                                <div className="mt-4"><Bullets items={project.highlights}/></div>
                            </section>
                        ))}

                        {highlights.length > 0 && <Bullets items={highlights}/>}
                    </div>

                    <aside className="lg:sticky lg:top-20 lg:self-start">
                        <h2 className="font-mono text-sm uppercase tracking-wider text-gray-500">Stack</h2>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {stack.map((tag) => {
                                const skill = skillFor(tag)
                                return <Tag key={tag} label={tag} href={skill ? `/?skill=${encodeURIComponent(skill)}#skills` : undefined}/>
                            })}
                        </div>
                    </aside>
                </div>

                <nav className="mt-16 grid gap-4 sm:grid-cols-2" aria-label="More experience">
                    <NeighborLink experience={prev || undefined} direction="prev"/>
                    <NeighborLink experience={next || undefined} direction="next"/>
                </nav>
            </article>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: experiences.map((e) => ({params: {slug: e.slug}})),
    fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
    const slug = params?.slug as string
    const experience = getExperience(slug)
    const {prev, next} = getNeighbors(slug)
    return {props: {experience, prev: prev || null, next: next || null}}
}
