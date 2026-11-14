export interface Profile {
    name: string
    title: string
    location: string
    email: string
    linkedin: string
    summary: string
}

export interface SkillGroup {
    name: string
    items: string[]
}

export interface Project {
    name: string
    subtitle: string
    period: string
    highlights: string[]
}

export interface Experience {
    slug: string
    role: string
    company: string
    companyFull?: string
    period: string
    start: string
    location: string
    summary?: string
    projects?: Project[]
    highlights: string[]
    stack: string[]
}

export interface Education {
    degree: string
    institution: string
    period: string
}

export interface Certification {
    name: string
    issuer: string
    date: string
}

export interface Learning {
    total: number
    summary: string
    path: string
    topics: string[]
}

export interface CV {
    profile: Profile
    skills: SkillGroup[]
    experiences: Experience[]
    education: Education[]
    certifications: Certification[]
    learning: Learning
}
