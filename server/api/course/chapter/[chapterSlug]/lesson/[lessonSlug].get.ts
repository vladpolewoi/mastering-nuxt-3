import { Course, Chapter, Lesson, LessonWithPath } from "~/types/course"
import course from "~/server/courseData"

course as Course

export default defineEventHandler((event): LessonWithPath => {
	const { chapterSlug, lessonSlug } = event.context.params || {}

	const chapter: Maybe<Chapter> = course.chapters.find((chapter) => {
		return chapter.slug === chapterSlug
	})

	if (!chapter) {
		throw createError({
			message: "Chapter not found",
			statusCode: 404,
		})
	}

	const lesson: Maybe<Lesson> = chapter.lessons.find((lesson) => {
		return lesson.slug === lessonSlug
	})

	if (!lesson) {
		throw createError({
			message: "Lesson not found",
			statusCode: 404,
		})
	}

	return {
		...lesson,
		path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
	}
})
