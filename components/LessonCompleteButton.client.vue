<template>
	<label
		class="rounded text-white font-bold py-2 px-4 cursor-pointer"
		:class="{
			'bg-green-500': modelValue,
			'bg-gray-500': !modelValue,
		}"
	>
		<input
			type="checkbox"
			:value="modelValue"
			@input="() => $emit('update:model-value', !modelValue)"
			class="hidden"
		/>{{ modelValue ? "Completed" : "Mark as complete" }}</label
	>
</template>

<script setup>
defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
})

defineEmits(["update:model-value"])
</script>

<style lang="scss" scoped>
::selection {
	display: none;
}
</style>
