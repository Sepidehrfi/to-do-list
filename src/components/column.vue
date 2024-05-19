<template>
	<div class="list">
		<div class="title removable editable">{{ title }}</div>
		<slot />
		<div class="add-card editable">Add another card</div>
	</div>
</template>
<script setup lang="ts">
defineProps<{
	title: string;
}>();
</script>
