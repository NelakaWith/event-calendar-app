<template>
  <div class="calendar">
    <div class="calendar-container">
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
      <AppNotification
        v-if="notification.show"
        :message="notification.message"
        :type="notification.type"
        @close="notification.show = false"
      />
    </div>
  </div>
</template>

<script setup>
// Imports
import { ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventForm from "../components/calendar/AddEventForm.vue";
import AppModal from "../components/modal/AppModal.vue";
import AppNotification from "../components/AppNotification.vue";
import axios from "axios";

// State
const showModal = ref(false);
const showEditModal = ref(false);
const selectedEvent = ref(null);
const notification = ref({ message: "", type: "error", show: false });

// Calendar options
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: "prev,next today addEventButton",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  customButtons: {
    addEventButton: {
      text: "+ Add Event",
      click() {
        showModal.value = true;
      },
    },
  },
  editable: true,
  selectable: true,
  events: [],
});

// Notification helper
function showNotification(message, type = "error") {
  notification.value = { message, type, show: true };
}

// Fetch events from backend
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
    showNotification(
      "Failed to load events: " + (err.response?.data?.message || err.message),
      "error"
    );
  }
}

// Add event handler
async function handleAddEventModal(event) {
  try {
    await axios.post("/api/events", event, { withCredentials: true });
    await fetchEvents();
    showModal.value = false;
    showNotification("Event added successfully!", "success");
  } catch (err) {
    showNotification(
      "Failed to add event: " + (err.response?.data?.message || err.message),
      "error"
    );
  }
}

// Edit event handler
async function handleEditEventModal(editedEvent) {
  try {
    await axios.put(`/api/events/${selectedEvent.value.id}`, editedEvent, {
      withCredentials: true,
    });
    await fetchEvents();
    showEditModal.value = false;
    selectedEvent.value = null;
    showNotification("Event updated successfully!", "success");
  } catch (err) {
    showNotification(
      "Failed to update event: " + (err.response?.data?.message || err.message),
      "error"
    );
  }
}

// Event click handler
function handleEventClick(info) {
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

// Register event click handler
calendarOptions.value.eventClick = handleEventClick;

// Fetch events on mount
onMounted(fetchEvents);
</script>
