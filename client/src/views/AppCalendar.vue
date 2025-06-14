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
      <AppModal
        :show="showEditModal"
        title="Edit Event"
        @close="showEditModal = false"
      >
        <AddEventForm
          v-if="selectedEvent"
          :showForm="showEditModal"
          :mode="'edit'"
          :initial-title="selectedEvent.title"
          :initial-location="selectedEvent.location"
          :initial-description="selectedEvent.description"
          :initial-start-time="selectedEvent.start_time"
          :initial-end-time="selectedEvent.end_time"
          @event-added="handleEditEventModal"
        />
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
const selectedEvent = ref(null);
const showEditModal = ref(false);

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

async function fetchEvents() {
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
}

onMounted(fetchEvents);

async function handleAddEventModal(event) {
  try {
    const res = await axios.post("/api/events", event, {
      withCredentials: true,
    });
    await fetchEvents();
    showModal.value = false;
  } catch (err) {
    alert(
      "Failed to add event: " + (err.response?.data?.message || err.message)
    );
  }
}

function handleEventClick(info) {
  // info.event is a FullCalendar EventApi object
  selectedEvent.value = {
    id: info.event.id,
    title: info.event.title,
    description: info.event.extendedProps.description,
    start_time: info.event.start,
    end_time: info.event.end,
    location: info.event.extendedProps.location,
  };
  showEditModal.value = true;
}

async function handleEditEventModal(editedEvent) {
  try {
    await axios.put(`/api/events/${selectedEvent.value.id}`, editedEvent, {
      withCredentials: true,
    });
    await fetchEvents();
    showEditModal.value = false;
    selectedEvent.value = null;
  } catch (err) {
    alert(
      "Failed to update event: " + (err.response?.data?.message || err.message)
    );
  }
}

calendarOptions.value.eventClick = handleEventClick;
</script>
