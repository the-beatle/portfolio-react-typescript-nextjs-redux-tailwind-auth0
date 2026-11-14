import React, {useMemo, useRef, useState} from "react"
import {hierarchy, linkHorizontal, tree, HierarchyPointNode} from "d3"

import useResizeObserver from "../hooks/useResizeObserver"
import type {SkillGroup} from "../types/cv"

interface Node {
    name: string
    group?: string
    count?: number
    children?: Node[]
}

interface Props {
    rootLabel: string
    groups: SkillGroup[]
    counts: Record<string, number>
    selected?: string
    onSelect: (skill?: string) => void
}

const ROW = 22
const LEFT = 60
const RIGHT = 190
const DEFAULT_OPEN = ["Frontend", "Backend", "Cloud & DevOps"]

const link = linkHorizontal<any, HierarchyPointNode<Node>>()
    .x((d) => d.y)
    .y((d) => d.x)

// Desktop skill tree: root → groups → skills. Groups expand/collapse, skills select a filter.
export default function SkillTree({rootLabel, groups, counts, selected, onSelect}: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dimensions = useResizeObserver(wrapperRef)
    const width = dimensions?.width || 900

    const selectedGroup = groups.find((g) => g.items.includes(selected || ""))?.name
    const [open, setOpen] = useState<string[]>(DEFAULT_OPEN)
    const openGroups = selectedGroup && !open.includes(selectedGroup) ? [...open, selectedGroup] : open

    const {root, height} = useMemo(() => {
        const data: Node = {
            name: rootLabel,
            children: groups.map((g) => ({
                name: g.name,
                count: g.items.length,
                children: openGroups.includes(g.name)
                    ? g.items.map((item) => ({name: item, group: g.name, count: counts[item] || 0}))
                    : undefined,
            })),
        }
        const h = hierarchy(data)
        // Collapsed groups are leaves too; give them more room than skill rows.
        const rows = h.leaves().reduce((n, l) => n + (l.depth === 1 ? 1.6 : 1), 0) + 1
        const height = Math.max(320, rows * ROW)
        const laid = tree<Node>()
            .size([height, Math.max(200, width - LEFT - RIGHT)])
            .separation((a, b) => (a.depth === 1 || b.depth === 1 ? 1.6 : 1) * (a.parent === b.parent ? 1 : 1.4))(h)
        return {root: laid, height}
    }, [rootLabel, groups, counts, openGroups.join("|"), width])

    const toggleGroup = (name: string) =>
        setOpen((prev) => prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name])

    const activate = (node: HierarchyPointNode<Node>) => {
        if (node.depth === 1) toggleGroup(node.data.name)
        if (node.depth === 2 && node.data.count) onSelect(selected === node.data.name ? undefined : node.data.name)
    }

    return (
        <div ref={wrapperRef} className="w-full">
            <svg width="100%" height={height + 20} role="tree" aria-label="Skills">
                <g transform={`translate(${LEFT},10)`}>
                    {root.links().map((l) => {
                        const isActive = l.target.data.name === selected
                        return (
                            <path
                                key={`${l.source.data.name}-${l.target.data.name}`}
                                className="tree-link"
                                d={link(l) || undefined}
                                fill="none"
                                stroke={isActive ? "#fde047" : "#bcd2fa"}
                                strokeOpacity={isActive ? 0.9 : 0.35}
                                strokeWidth={isActive ? 1.5 : 1}
                            />
                        )
                    })}

                    {root.descendants().map((node) => {
                        const isSkill = node.depth === 2
                        const isGroup = node.depth === 1
                        const isSelected = isSkill && node.data.name === selected
                        const disabled = isSkill && !node.data.count
                        const expanded = isGroup && openGroups.includes(node.data.name)
                        const interactive = isGroup || (isSkill && !disabled)
                        const label = isGroup && !expanded ? `${node.data.name} (${node.data.count})` : node.data.name

                        return (
                            <g
                                key={`${node.depth}-${node.data.name}`}
                                className={`tree-node ${interactive ? "cursor-pointer" : ""}`}
                                transform={`translate(${node.y},${node.x})`}
                                role={interactive ? "button" : undefined}
                                tabIndex={interactive ? 0 : undefined}
                                aria-pressed={isSkill ? isSelected : undefined}
                                aria-expanded={isGroup ? expanded : undefined}
                                aria-label={isSkill ? `${node.data.name}: ${node.data.count} ${node.data.count === 1 ? "role" : "roles"}` : label}
                                onClick={() => interactive && activate(node)}
                                onKeyDown={(ev) => {
                                    if (interactive && (ev.key === "Enter" || ev.key === " ")) {
                                        ev.preventDefault()
                                        activate(node)
                                    }
                                }}
                                opacity={disabled ? 0.4 : 1}
                            >
                                <circle
                                    r={isSelected ? 6 : isGroup ? 5 : 4}
                                    fill={isSelected ? "#fde047" : isGroup && !expanded ? "#1f2937" : "orange"}
                                    stroke="orange"
                                    strokeWidth={isGroup && !expanded ? 2 : 0}
                                />
                                {/* bigger invisible hit area */}
                                {interactive && <rect x={-8} y={-11} width={isSkill ? 170 : 130} height={22} fill="transparent"/>}
                                <text
                                    x={isSkill || (isGroup && !expanded) ? 10 : -10}
                                    y={isSkill || (isGroup && !expanded) ? 4 : -9}
                                    textAnchor={isSkill || (isGroup && !expanded) ? "start" : "end"}
                                    className="font-mono"
                                    fontSize={isSkill ? 12 : 13}
                                    fill={isSelected ? "#fde047" : isGroup ? "#93c5fd" : node.depth === 0 ? "#4ade80" : "#e5e7eb"}
                                >
                                    {label}
                                    {isSkill && !disabled && (
                                        <tspan fill="#6b7280" fontSize={10}>{`  ${node.data.count}`}</tspan>
                                    )}
                                </text>
                            </g>
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}
