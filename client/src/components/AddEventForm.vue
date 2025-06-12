<template>
  <form v-if="showForm" @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label class="block mb-1 font-semibold">Title</label>
      <input
        v-model="title"
        type="text"
        class="w-full border rounded px-2 py-1"
        required
      />
    </div>
    <div>
      <label class="block mb-1 font-semibold">Description</label>
      <textarea
        v-model="description"
        class="w-full border rounded px-2 py-1"
        rows="2"
      ></textarea>
    </div>
    <div class="flex gap-4">
      <div class="flex-1">
        <label class="block mb-1 font-semibold">Start Time</label>
        <input
          v-model="start_time"
          type="datetime-local"
          class="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div class="flex-1">
        <label class="block mb-1 font-semibold">End Time</label>
        <input
          v-model="end_time"
          type="datetime-local"
          class="w-full border rounded px-2 py-1"
          required
        />
      </div>
    </div>
    <div>
      <label class="block mb-1 font-semibold">Location</label>
      <input
        v-model="location"
        type="text"
        class="w-full border rounded px-2 py-1"
      />
    </div>
    <div class="flex justify-end">
      <button type="submit">Add Event</button>
    </div>
    <div v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</div>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["event-added"]);
const props = defineProps({ showForm: { type: Boolean, default: true } });
const title = ref("");
const description = ref("");
const start_time = ref("");
const end_time = ref("");
const location = ref("");
const error = ref("");

const onSubmit = () => {
  error.value = "";
  if (!title.value || !start_time.value || !end_time.value) {
    error.value = "Title, start and end time are required.";
    return;
  }
  if (new Date(start_time.value) >= new Date(end_time.value)) {
    error.value = "Start time must be before end time.";
    return;
  }
  emit("event-added", {
    title: title.value,
    description: description.value,
    start_time: start_time.value,
    end_time: end_time.value,
    location: location.value,
  });
  // Reset form
  title.value = "";
  description.value = "";
  start_time.value = "";
  end_time.value = "";
  location.value = "";
};

// Reset form fields when the modal is closed
watch(
  () => props.showForm,
  (val) => {
    if (!val) {
      title.value = "";
      description.value = "";
      start_time.value = "";
      end_time.value = "";
      location.value = "";
      error.value = "";
    }
  }
);
</script>
