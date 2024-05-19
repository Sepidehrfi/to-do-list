<template>
  <div class="card-container">
    <div class="card">
		<input v-model="data.title" class="title" />
		<textarea v-model="data.description" class="description" />
      <button
        style="font-size: smaller; background-color: rgba(254, 98, 77, 0.437)"
        @click="emit('deleteTask')"
      >
        Delete Task &#x2613;
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";

const props = defineProps<{
  title: string;
  description: string;
}>();
const data = reactive({
  title: props.title,
  description: props.description,
});

const emit = defineEmits(["dataChange", "deleteTask"]);
watch(data, () => {
  emit("dataChange", data);
});
</script>
<style scoped>
.title {
  all: unset;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
.description {
  all: unset;
  font-size: 16px;
  margin-bottom: 10px;
  min-height: 100px;
  width: 100%;
}
</style>
