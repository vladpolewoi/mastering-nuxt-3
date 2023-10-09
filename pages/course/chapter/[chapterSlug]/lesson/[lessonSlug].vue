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
			v-if="user"
			:model-value="isCompleted"
			@update:model-value="toggleComplete"
		/>
	</div>
</template>

<script setup>
import { useCourseProgress } from "@/stores/courseProgress"

// store
const store = useCourseProgress()
const { initialize, toggleComplete } = store

initialize()

const user = useSupabaseUser()
const course = await useCourse()
const route = useRoute()
const { chapterSlug, lessonSlug } = route.params
const lesson = await useLesson(chapterSlug, lessonSlug)

definePageMeta({
	middleware: [
		async function ({ params }, from) {
			const course = await useCourse()

			const chapter = course.value.chapters.find((chapter) => {
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
		"auth",
	],
})

const chapter = computed(() => {
	return course.value.chapters.find((chapter) => {
		return chapter.slug === route.params.chapterSlug
	})
})

const title = computed(() => {
	return `${lesson.value.title} - ${course.value.title} - Mastering Nuxt`
})

useHead({
	title,
})

const isCompleted = computed(() => {
	return store.progress?.[chapterSlug]?.[lessonSlug] || 0
})
</script>

<style lang="scss" scoped></style>
