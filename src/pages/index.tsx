import React, {useMemo} from "react"
import Link from "next/link"
import {useRouter} from "next/router"

import Layout from "../components/Layout"
import SkillTree from "../components/SkillTree"
import SkillChips from "../components/SkillChips"
import Timeline from "../components/Timeline"
import {cv, experiences, experiencesWithSkill} from "../lib/cv"

function Section({id, title, children}: { id: string, title: string, children: React.ReactNode }) {
    return (
        <section id={id} className="pt-16 sm:pt-24">
            <h2 className="font-mono text-2xl text-white sm:text-3xl">
                <span className="text-orange-400">#</span> {title}
            </h2>
            <div className="mt-6 sm:mt-8">{children}</div>
        </section>
    )
}

export default function Home() {
    const router = useRouter()
    const skill = typeof router.query.skill === "string" ? router.query.skill : undefined
    const {profile, skills, education, certifications, learning} = cv

    const counts = useMemo(() => {
        const c: Record<string, number> = {}
        skills.forEach((g) => g.items.forEach((s) => { c[s] = experiencesWithSkill(s).length }))
        return c
    }, [skills])

    const matches = skill ? experiencesWithSkill(skill) : []

    const select = (next?: string) => {
        router.replace(next ? {pathname: "/", query: {skill: next}} : "/", undefined, {shallow: true, scroll: false})
    }

    return (
        <Layout>
            {/* Hero */}
            <section className="pt-16 sm:pt-28">
                <p className="font-mono text-blue-400 sm:text-lg">Hello world, I'm</p>
                <h1 className="mt-2 font-mono text-4xl text-white sm:text-6xl">{profile.name}</h1>
                <p className="mt-3 font-mono text-xl text-green-500 sm:text-2xl">{profile.title}</p>
                <p className="mt-2 text-gray-400">{profile.location}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <a href="#experience" className="rounded-lg bg-blue-500 px-5 py-2.5 font-mono text-sm text-white transition-colors hover:bg-blue-400">
                        View experience
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-white/15 px-5 py-2.5 font-mono text-sm text-gray-200 transition-colors hover:border-blue-400 hover:text-blue-300">
                        LinkedIn
                    </a>
                    <a href={`mailto:${profile.email}`} className="rounded-lg border border-white/15 px-5 py-2.5 font-mono text-sm text-gray-200 transition-colors hover:border-blue-400 hover:text-blue-300">
                        Email
                    </a>
                </div>
            </section>

            <Section id="about" title="About">
                <p className="max-w-3xl text-lg leading-relaxed text-gray-300">{profile.summary}</p>
            </Section>

            <Section id="skills" title="Skills">
                <p className="mb-6 text-sm text-gray-400">
                    Pick a skill to see the roles where I used it.
                    <span className="hidden md:inline"> Click a category to expand or collapse it.</span>
                </p>

                <div className="hidden md:block">
                    <SkillTree rootLabel={profile.name.split(" ")[0]} groups={skills} counts={counts} selected={skill} onSelect={select}/>
                </div>
                <div className="md:hidden">
                    <SkillChips groups={skills} counts={counts} selected={skill} onSelect={select}/>
                </div>

                {skill && (
                    <div className="mt-6 rounded-xl border border-yellow-300/30 bg-yellow-300/5 p-4 sm:p-5" aria-live="polite">
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm text-gray-300">
                                <span className="font-mono text-yellow-200">{skill}</span> · {matches.length} {matches.length === 1 ? "role" : "roles"}
                            </p>
                            <button type="button" onClick={() => select(undefined)} className="font-mono text-xs text-gray-400 hover:text-white">
                                Clear ✕
                            </button>
                        </div>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {matches.map((e) => (
                                <li key={e.slug}>
                                    <Link href={`/experience/${e.slug}`}>
                                        <a className="block rounded-lg border border-white/10 px-3 py-2 text-sm transition-colors hover:border-blue-400">
                                            <span className="text-white">{e.role}</span>
                                            <span className="block text-xs text-gray-400">{e.company} · {e.period}</span>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Section>

            <Section id="experience" title="Experience">
                {skill && (
                    <p className="mb-4 text-sm text-gray-400">
                        Highlighting roles with <span className="font-mono text-yellow-200">{skill}</span>.{" "}
                        <button type="button" onClick={() => select(undefined)} className="text-blue-400 hover:text-blue-300">Show all</button>
                    </p>
                )}
                <Timeline experiences={experiences} skill={skill}/>
            </Section>

            <Section id="education" title="Education & certifications">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        {education.map((ed) => (
                            <div key={ed.degree} className="rounded-xl border border-white/10 p-5">
                                <p className="font-mono text-xs text-green-500">{ed.period}</p>
                                <h3 className="mt-1 font-semibold text-white">{ed.degree}</h3>
                                <p className="text-sm text-blue-400">{ed.institution}</p>
                            </div>
                        ))}
                        <div className="rounded-xl border border-white/10 p-5">
                            <h3 className="font-semibold text-white">LinkedIn Learning</h3>
                            <p className="mt-1 text-sm text-gray-400">{learning.summary}</p>
                            <p className="mt-2 text-sm text-gray-300">Learning path: {learning.path}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {learning.topics.map((t) => (
                                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-gray-300">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <ul className="divide-y divide-white/5 rounded-xl border border-white/10">
                        {certifications.map((c) => (
                            <li key={c.name} className="flex items-baseline justify-between gap-4 p-4">
                                <div>
                                    <p className="text-sm text-white">{c.name}</p>
                                    <p className="text-xs text-gray-500">{c.issuer}</p>
                                </div>
                                <span className="flex-none font-mono text-xs text-gray-400">{c.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Section>
        </Layout>
    )
}
