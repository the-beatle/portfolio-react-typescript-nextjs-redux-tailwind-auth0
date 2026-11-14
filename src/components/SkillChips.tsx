import React from "react"

import type {SkillGroup} from "../types/cv"

interface Props {
    groups: SkillGroup[]
    counts: Record<string, number>
    selected?: string
    onSelect: (skill?: string) => void
}

// Mobile alternative to the D3 tree: grouped, tappable skill chips.
export default function SkillChips({groups, counts, selected, onSelect}: Props) {
    return (
        <div className="space-y-5">
            {groups.map((g) => (
                <div key={g.name}>
                    <h3 className="font-mono text-sm text-blue-300">{g.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {g.items.map((item) => {
                            const count = counts[item] || 0
                            const active = selected === item
                            return (
                                <button
                                    key={item}
                                    type="button"
                                    disabled={!count}
                                    aria-pressed={active}
                                    onClick={() => onSelect(active ? undefined : item)}
                                    className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors disabled:opacity-40 ${active
                                        ? "border-yellow-300 bg-yellow-300/10 text-yellow-200"
                                        : "border-white/10 bg-white/5 text-gray-200 active:border-blue-400"}`}
                                >
                                    {item}
                                    {count > 0 && <span className="ml-1.5 text-gray-500">{count}</span>}
                                </button>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
