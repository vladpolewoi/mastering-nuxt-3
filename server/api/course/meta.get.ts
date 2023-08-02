import {
	Course,
	Chapter,
	Lesson,
	CourseMeta,
	OutlineChapter,
	OutlineLesson,
} from "~/types/course"
import course from "~/server/courseData"

course as Course

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
