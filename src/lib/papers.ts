import type { PaperCollection } from "$lib/types";

import ME413 from "$lib/data/me413.json";
import ME417 from "$lib/data/me417.json";
import ME431 from "$lib/data/me431.json";
import ME451 from "$lib/data/me451.json";
import ME461 from "$lib/data/me461.json";

export const papersCollection: PaperCollection = {
    ME413,
    ME417,
    ME431,
    ME451,
    ME461
}

export function getCourseData(courseId: string) {
    return papersCollection[courseId as keyof typeof papersCollection] || [];
}

export function getAvailableBatches(courseId: string): string[] {
    const courseData = getCourseData(courseId);
    return courseData.map(paper => paper.batch).sort((a, b) => parseInt(b) - parseInt(a));
}