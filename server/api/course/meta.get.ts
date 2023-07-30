import { Course, Chapter, Lesson } from "~/types/course"
import course from "~/server/courseData"

course as Course

type OutlineBase = {
	title: string
	slug: string
	number: number
}

type OutlineLesson = OutlineBase & {
	path: string
}

type OutlineChapter = OutlineBase & {
	lessons: OutlineLesson[]
}

type CourseMeta = {
	title: string
	chapters: OutlineChapter[]
}
export default defineEventHandler((event): CourseMeta => {
	const outline: OutlineChapter[] = course.chapters.reduce(
		(acc: OutlineChapter[], chapter: Chapter) => {
			const lessons: OutlineLesson[] = chapter.lessons.map(
				(lesson: Lesson) => ({
					title: lesson.title,
					slug: lesson.slug,
					number: lesson.number,
					path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
				})
			)

			const item: OutlineChapter = {
				title: chapter.title,
				slug: chapter.slug,
				number: chapter.number,
				lessons,
			}

			return [...acc, item]
		},
		[]
	)

	return {
		title: course.title,
		chapters: outline,
	}
})
