import course from "~/server/courseData"

export default defineEventHandler((event) => {
	const { chapterSlug, lessonSlug } = event.context.params || {}

	const chapter = course.chapters.find((chapter) => {
		return chapter.slug === chapterSlug
	})

	if (!chapter) {
		throw createError({
			message: "Chapter not found",
			statusCode: 404,
		})
	}

	const lesson = chapter.lessons.find((lesson) => {
		return lesson.slug === lessonSlug
	})

	if (!lesson) {
		throw createError({
			message: "Lesson not found",
			statusCode: 404,
		})
	}

	return lesson
})
