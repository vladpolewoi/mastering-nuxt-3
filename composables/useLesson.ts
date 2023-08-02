import { StorageSerializers } from "@vueuse/core"
import { LessonWithPath } from "types/course"

export default async (chapterSlug: string, lessonSlug: string) => {
	// Use sessionStorage to cache the lesson data
	const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
	const lesson = useSessionStorage<LessonWithPath>(url, null, {
		serializer: StorageSerializers.object,
	})

	if (!lesson.value) {
		const { data, error } = await useFetch(
			`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
		)

		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Could not fetch lesson ${lessonSlug} from chapter ${chapterSlug}`,
			})
		}

		lesson.value = data.value
	} else {
		console.log("GOT from cache", lessonSlug)
	}

	return lesson
}
