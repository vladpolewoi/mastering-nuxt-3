<template>
	<div>
		<div class="mb-4 flex justify-between items-center w-full">
			<h1 class="text-3xl">
				<span class="font-medium"
					><span class="font-bold">{{ title }}</span></span
				>
			</h1>
			<UserCard />
		</div>

		<div class="flex flex-row justify-center flex-grow">
			<div
				class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
			>
				<h3>Chapters</h3>
				<div
					v-for="chapter in chapters"
					:key="chapter.slug"
					class="space-y-1 mb-4 flex flex-col"
				>
					<h4>{{ chapter.title }}</h4>
					<NuxtLink
						v-for="(lesson, index) in chapter.lessons"
						:key="lesson.slug"
						class="flex flex-row space-x-1 no-underline prose-sm py-1 font-normal"
						:to="lesson.path"
						:class="{
							'text-blue-500': lesson.path === $route.fullPath,
							'text-gray-600': lesson.path !== $route.fullPath,
						}"
					>
						<span class="text-gray-500"> {{ index + 1 }}. </span>
						<span>{{ lesson.title }}</span>
					</NuxtLink>
				</div>
			</div>

			<div class="prose p-12 bg-white rounded-md w-[65ch] prose-lg">
				<NuxtErrorBoundary>
					<NuxtPage />

					<template #error="{ error }">
						<p>
							Oh no, something went wrong with this lesson!
							<code>{{ error }}</code>
						</p>

						<p>
							<button
								class="hover:cursor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
								@click="resetError(error)"
							>
								Reset
							</button>
						</p>
					</template>
				</NuxtErrorBoundary>
			</div>
		</div>
	</div>
</template>

<script setup>
const { chapters, title } = useCourse()

const resetError = async (error) => {
	await navigateTo("/")
	error.value = null
}
</script>
