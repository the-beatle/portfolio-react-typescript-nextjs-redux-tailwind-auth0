import React from "react"
import Link from "next/link"

interface Props {
    label: string
    href?: string
    active?: boolean
}

const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs transition-colors"

export default function Tag({label, href, active}: Props) {
    const tone = active
        ? "border-yellow-300 bg-yellow-300/10 text-yellow-200"
        : "border-white/10 bg-white/5 text-gray-300"

    if (!href) return <span className={`${base} ${tone}`}>{label}</span>

    return (
        <Link href={href} scroll={false}>
            <a className={`${base} ${tone} hover:border-blue-400 hover:text-blue-300`}>{label}</a>
        </Link>
    )
}
