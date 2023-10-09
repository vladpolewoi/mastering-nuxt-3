<template>
	<NuxtLink
		class="border border-green-500 rounded-md p-4 text-green-500"
		:to="firstLesson.path"
		>Go to first lesson</NuxtLink
	>
</template>

<script setup lang="ts">
const firstLesson = await useFirstLesson()
</script>

<style lang="scss" scoped></style>
