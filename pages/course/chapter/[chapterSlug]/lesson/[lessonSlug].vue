<template>
	<div>
		<p class="mt-0 uppercase font-bold text-slate-400 mb-1">
			Lesson {{ chapter.number }} - {{ lesson.number }}
		</p>
		<h2 class="my-0">{{ lesson.title }}</h2>
		<div class="flex space-x-4 mt-2 mb-8">
			<NuxtLink
				v-if="lesson.sourceUrl"
				class="font-normal text-md text-gray-500"
				:to="lesson.sourceUrl"
			>
				Download Source Code
			</NuxtLink>
			<NuxtLink
				v-if="lesson.downloadUrl"
				class="font-normal text-md text-gray-500"
				:to="lesson.downloadUrl"
			>
				Download Video
			</NuxtLink>
		</div>
		<VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
		<p>{{ lesson.text }}</p>
		<LessonCompleteButton
			:model-value="isLessonCompleted"
			@update:model-value="toggleComplete"
		/>
	</div>
</template>

<script setup>
const course = useCourse()
const route = useRoute()

definePageMeta({
	middleware: function ({ params }, from) {
		const course = useCourse()

		const chapter = course.chapters.find((chapter) => {
			return chapter.slug === params.chapterSlug
		})

		if (!chapter) {
			return abortNavigation(
				createError({
					message: "Chapter not found",
					statusCode: 404,
				})
			)
		}

		const lesson = chapter.lessons.find((lesson) => {
			return lesson.slug === params.lessonSlug
		})

		if (!lesson) {
			return abortNavigation(
				createError({
					message: "Lesson not found",
					statusCode: 404,
				})
			)
		}
	},
})

const chapter = computed(() => {
	return course.chapters.find((chapter) => {
		return chapter.slug === route.params.chapterSlug
	})
})

const lesson = computed(() => {
	return chapter.value.lessons.find((lesson) => {
		return lesson.slug === route.params.lessonSlug
	})
})

const title = computed(() => {
	return `${lesson.value.title} - ${course.title} - Mastering Nuxt`
})

useHead({
	title,
})

// Progress tracking
const progress = useLocalStorage("progress", [])

const isLessonCompleted = computed(
	() => progress.value?.[chapter.value.number - 1]?.[lesson.value.number - 1]
)

const toggleComplete = () => {
	progress.value[chapter.value.number - 1] ||= []
	progress.value[chapter.value.number - 1][lesson.value.number - 1] =
		!isLessonCompleted.value
}
</script>

<style lang="scss" scoped></style>
