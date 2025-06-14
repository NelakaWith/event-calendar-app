<template>
  <form v-if="showForm" @submit.prevent="onSubmit" novalidate class="space-y-4">
    <AppInputGroup
      label="Title"
      id="title"
      name="title"
      type="text"
      v-model="title"
      :error="errors.title"
      @input="validateField('title')"
    />
    <AppInputGroup
      label="Location"
      id="location"
      name="location"
      type="text"
      v-model="location"
      :error="errors.location"
      @input="validateField('location')"
    />
    <div class="flex justify-between space-x-4">
      <AppDateTimePicker
        label="Start Time"
        id="start_time"
        name="start_time"
        v-model="start_time"
        :error="errors.start_time"
        @input="validateField('start_time')"
      />
      <AppDateTimePicker
        label="End Time"
        id="end_time"
        name="end_time"
        v-model="end_time"
        :error="errors.end_time"
        @input="validateField('end_time')"
      />
    </div>
    <div class="app-input-group">
      <label for="description" class="block mb-1 text-gray-700">
        Description
      </label>
      <textarea v-model="description" id="description" rows="2"></textarea>
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Event
      </button>
    </div>
    <AppFormError v-if="error" :message="error" />
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import * as yup from "yup";
import AppInputGroup from "./AppInputGroup.vue";
import AppFormError from "./AppFormError.vue";
import AppDateTimePicker from "./AppDateTimePicker.vue";

const emit = defineEmits(["event-added"]);
const props = defineProps({ showForm: { type: Boolean, default: true } });
const title = ref("");
const description = ref("");
const start_time = ref("");
const end_time = ref("");
const location = ref("");
const error = ref("");
const errors = ref({});

const schema = yup.object({
  title: yup.string().required("Title is required."),
  start_time: yup.string().required("Start time is required."),
  end_time: yup
    .string()
    .required("End time is required.")
    .test("is-after", "End time must be after start time.", function (value) {
      const { start_time } = this.parent;
      return !value || !start_time || new Date(value) > new Date(start_time);
    }),
  location: yup.string(),
});

const validateField = async (field) => {
  try {
    await schema.validateAt(field, {
      title: title.value,
      start_time: start_time.value,
      end_time: end_time.value,
      location: location.value,
    });
    errors.value[field] = "";
  } catch (err) {
    errors.value[field] = err.message;
  }
};

const onSubmit = async () => {
  error.value = "";
  errors.value = {};
  try {
    await schema.validate(
      {
        title: title.value,
        start_time: start_time.value,
        end_time: end_time.value,
        location: location.value,
      },
      { abortEarly: false }
    );
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
  } catch (err) {
    if (err.inner) {
      err.inner.forEach((e) => {
        errors.value[e.path] = e.message;
      });
    } else {
      error.value = err.message;
    }
  }
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
      errors.value = {};
    }
  }
);
</script>
