<template>
  <div class="calendar">
    <div class="calendar-container">
      <button
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
        @click="showModal = true"
      >
        + Add Event
      </button>
      <AppModal
        :show="showModal"
        title="Add New Event"
        @close="showModal = false"
      >
        <AddEventForm @event-added="handleAddEventModal" />
      </AppModal>
      <FullCalendar
        :options="calendarOptions"
        style="max-width: 1000px; margin: 0 auto"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventForm from "../components/AddEventForm.vue";
import AppModal from "../components/AppModal.vue";
import axios from "axios";

const showModal = ref(false);

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  editable: true,
  selectable: true,
  events: [],
});

async function handleAddEventModal(event) {
  try {
    const res = await axios.post("/api/events", event, {
      withCredentials: true,
    });
    calendarOptions.value.events.push({
      title: res.data.event.title,
      start: res.data.event.start_time,
      end: res.data.event.end_time,
      description: res.data.event.description,
      location: res.data.event.location,
      id: res.data.event.id,
    });
    showModal.value = false;
  } catch (err) {
    alert(
      "Failed to add event: " + (err.response?.data?.message || err.message)
    );
  }
}

onMounted(async () => {
  try {
    const res = await axios.get("/api/events", { withCredentials: true });
    calendarOptions.value.events = res.data.events.map((event) => ({
      title: event.title,
      start: event.start_time,
      end: event.end_time,
      description: event.description,
      location: event.location,
      id: event.id,
    }));
  } catch (err) {
    alert(
      "Failed to load events: " + (err.response?.data?.message || err.message)
    );
  }
});
</script>
