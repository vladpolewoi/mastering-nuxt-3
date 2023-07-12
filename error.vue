<template>
	<NuxtLayout>
		<div class="prose" v-if="error.statusCode === 404">
			<h1>404</h1>
			<p>I guess that page doesn't exists.</p>
		</div>
		<div class="prose" v-else>
			<h1>Error</h1>
			<p>It look like something went wrong</p>
			<p>Sorry about that.</p>
		</div>
		<div class="prose mt-5">
			<p>
				<strong>{{ error.message }}</strong>
			</p>
			<p>
				Go to the
				<a class="hover:cursor-pointer" @click="handleError">Home page.</a>
			</p>
		</div>
	</NuxtLayout>
</template>

<script setup>
const error = useError()

const handleError = () => {
	clearError({
		redirect: "/",
	})
}
</script>
