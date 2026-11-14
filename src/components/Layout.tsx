import React, {ReactNode, useState} from "react"
import Head from "next/head"
import Link from "next/link"

import {cv} from "../lib/cv"

const NAV = [
    {href: "/#about", label: "About"},
    {href: "/#skills", label: "Skills"},
    {href: "/#experience", label: "Experience"},
    {href: "/#education", label: "Education"},
]

interface Props {
    title?: string
    description?: string
    children: ReactNode
}

export default function Layout({title, description, children}: Props) {
    const [open, setOpen] = useState(false)
    const fullTitle = title ? `${title} · ${cv.profile.name}` : `${cv.profile.name} · ${cv.profile.title}`
    const desc = description || cv.profile.summary

    return (
        <>
            <Head>
                <title>{fullTitle}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content={desc}/>
                <meta property="og:title" content={fullTitle}/>
                <meta property="og:description" content={desc}/>
                <meta property="og:type" content="website"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <header className="sticky top-0 z-20 border-b border-white/5 bg-ink-800/90 backdrop-blur">
                <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
                    <Link href="/">
                        <a className="font-mono text-sm text-blue-400 hover:text-blue-300">
                            {"<"}{cv.profile.name}{" />"}
                        </a>
                    </Link>

                    <ul className="hidden gap-6 text-sm sm:flex">
                        {NAV.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    <a className="text-gray-400 transition-colors hover:text-white">{item.label}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        className="rounded p-2 text-gray-300 hover:bg-white/5 sm:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                            {open
                                ? <path d="M4 4l12 12M16 4L4 16"/>
                                : <path d="M3 5h14M3 10h14M3 15h14"/>}
                        </svg>
                    </button>
                </nav>

                {open && (
                    <ul className="border-t border-white/5 px-4 py-2 sm:hidden">
                        {NAV.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    <a className="block py-2 text-gray-300" onClick={() => setOpen(false)}>{item.label}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </header>

            <main className="mx-auto max-w-5xl px-4 sm:px-6">{children}</main>

            <footer className="mx-auto mt-24 max-w-5xl border-t border-white/5 px-4 py-8 text-sm text-gray-500 sm:px-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                    <span>© {new Date().getFullYear()} {cv.profile.name} · {cv.profile.location}</span>
                    <span className="flex gap-4">
                        <a className="hover:text-white" href={`mailto:${cv.profile.email}`}>Email</a>
                        <a className="hover:text-white" href={cv.profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                    </span>
                </div>
            </footer>
        </>
    )
}
