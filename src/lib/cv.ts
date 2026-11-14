import data from "../data/cv.json"
import type {CV, Experience} from "../types/cv"

export const cv: CV = data

export const experiences: Experience[] = cv.experiences

export function getExperience(slug: string): Experience | undefined {
    return experiences.find((e) => e.slug === slug)
}

// A skill matches its exact tag or a more specific one: "AWS" matches "AWS Lambda", "Django" matches "Django REST Framework".
export function usesSkill(experience: Experience, skill: string): boolean {
    return experience.stack.some((tag) => tag === skill || tag.startsWith(`${skill} `))
}

export function experiencesWithSkill(skill: string): Experience[] {
    return experiences.filter((e) => usesSkill(e, skill))
}

export function getNeighbors(slug: string): { prev?: Experience, next?: Experience } {
    const i = experiences.findIndex((e) => e.slug === slug)
    // List is newest first: "prev" is the older role, "next" the newer one.
    return {prev: experiences[i + 1], next: experiences[i - 1]}
}
