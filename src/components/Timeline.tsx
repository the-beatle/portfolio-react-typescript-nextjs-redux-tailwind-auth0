import React from "react"
import Link from "next/link"

import Tag from "./Tag"
import {usesSkill} from "../lib/cv"
import type {Experience} from "../types/cv"

interface Props {
    experiences: Experience[]
    skill?: string
}

const MAX_TAGS = 5

export default function Timeline({experiences, skill}: Props) {
    return (
        <ol className="relative space-y-4 sm:ml-3 sm:space-y-6 sm:border-l sm:border-white/10 sm:pl-8">
            {experiences.map((e) => {
                const match = !skill || usesSkill(e, skill)
                // Put the selected skill first so it is visible in the card.
                const tags = skill && match
                    ? [...e.stack.filter((t) => usesSkill({...e, stack: [t]}, skill)), ...e.stack.filter((t) => !usesSkill({...e, stack: [t]}, skill))]
                    : e.stack
                const clients = e.projects?.map((p) => p.name).join(" · ")

                return (
                    <li
                        key={e.slug}
                        className={`relative transition-opacity duration-300 ${match ? "opacity-100" : "opacity-30"}`}
                    >
                        <span
                            style={{left: "-2.42rem"}}
                            className={`absolute top-6 hidden h-3 w-3 rounded-full border-2 sm:block ${match && skill ? "border-yellow-300 bg-yellow-300" : "border-orange-400 bg-ink-800"}`}
                            aria-hidden
                        />
                        <Link href={`/experience/${e.slug}`}>
                            <a className={`group block rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:bg-ink-700/60 ${match && skill ? "border-yellow-300/40 bg-ink-700/40" : "border-white/10"}`}>
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                    <h3 className="font-mono text-lg text-white group-hover:text-blue-300">{e.role}</h3>
                                    <span className="font-mono text-xs text-green-500 sm:text-sm">{e.period}</span>
                                </div>
                                <p className="mt-1 text-blue-400">{e.companyFull || e.company}</p>
                                {clients && <p className="mt-1 text-sm text-gray-400">Clients: {clients}</p>}
                                {e.summary && <p className="mt-3 text-sm leading-relaxed text-gray-400">{e.summary}</p>}
                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    {tags.slice(0, MAX_TAGS).map((t) => (
                                        <Tag key={t} label={t} active={!!skill && usesSkill({...e, stack: [t]}, skill)}/>
                                    ))}
                                    {tags.length > MAX_TAGS && <span className="font-mono text-xs text-gray-500">+{tags.length - MAX_TAGS}</span>}
                                    <span className="ml-auto font-mono text-xs text-gray-500 group-hover:text-blue-300">Details →</span>
                                </div>
                            </a>
                        </Link>
                    </li>
                )
            })}
        </ol>
    )
}
