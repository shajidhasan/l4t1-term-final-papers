import type { Question, QuestionSet } from "$lib/types";

import { papersCollection } from "$lib/papers";

export const deslugified = (s: string): string => {
    const result = s
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return result
}

export const getGroupsByTopic = (topic: string, courseCode: string) => {
    const questions: Question[] = []
    const papers = papersCollection[courseCode]

    if (!papers) return { batches: [], grouped: [] }

    papers.forEach(paper => {
        paper.paper.sections.forEach(section => {
            section.sets.forEach(set => {
                set.questions.forEach(question => {
                    if (question.topic === topic) {
                        questions.push(question)
                    }
                })
            })
        })
    })

    const batches: string[] = []
    const grouped: Question[][] = []

    questions.forEach(question => {
        const batch = question.id.split('-')[1]
        if (!batches.includes(batch)) {
            batches.push(batch)
            grouped.push([])
        }
        const index = batches.indexOf(batch)
        grouped[index].push(question)
    })

    batches.sort((a, b) => b.localeCompare(a));

    return { batches, grouped }
}


export const getSetsByTopic = (topic: string, courseCode: string) => {
    const setList: string[] = []
    const papers = papersCollection[courseCode]

    if (!papers) return []

    papers.forEach(paper => {
        paper.paper.sections.forEach(section => {
            section.sets.forEach(set => {
                set.questions.forEach(question => {
                    if (question.topic === topic) {
                        const setId = question.id.substring(0, 10)
                        if (!setList.includes(setId)) {
                            setList.push(setId)
                        }
                    }
                })
            })
        })
    })

    const loaded: string[] = []
    const sets: (QuestionSet & { batch: string })[] = []

    papers.forEach(paper => {
        paper.paper.sections.forEach(section => {
            section.sets.forEach(set => {
                const setId = set.questions[0].id.substring(0, 10)

                if (setList.includes(setId) && !loaded.includes(setId)) {
                    const s = { ...set, batch: set.questions[0].id.split('-')[1] }
                    sets.push(s);
                    loaded.push(setId);
                }
            })
        })
    })

    sets.sort((a, b) => b.batch.localeCompare(a.batch))

    return sets
}