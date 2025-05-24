# Event Calendar App

A full-stack web app to allow users to schedule, view, and manage events via an interactive calendar interface.

## Tech Stack

- **Frontend:** Vue 3, Tailwind CSS, FullCalendar
- **Backend:** Express.js
- **Database:** MySQL
- **Authentication:** JWT, bcrypt
- **Optional:** node-cron (reminders), Nodemailer (email)

## Features

- User authentication (JWT-based)
- Create, update, and delete events
- View events in calendar (month/week/day view)
- Optional: Recurring events, time zone support, reminders

## Modules

### Authentication & User Management

- Register and login (JWT)
- Optional: Forgot password

### Calendar View

- FullCalendar integration
- Monthly/weekly/daily views
- Click to create/edit/delete events

### Event Management

- Modal/Form for adding/editing events
- Fields: title, description, start_time, end_time, location
- Validation: start < end

### Recurring Events (Optional)

- Daily, weekly, monthly options
- Show repeat rules visually

### Time Zone Handling

- Detect and display user’s time zone
- Store times in UTC + user timezone

### Notifications/Reminders (Optional)

- Reminders via background jobs (node-cron)
- Email notifications (Nodemailer)

## Folder Structure

### Frontend (Vue)

```
client/
  src/
    components/
    views/
    store/
    services/
    router/
    App.vue
```

### Backend (Express)

```
server/
  src/
    controllers/
    routes/
    middleware/
    models/
    utils/
    index.js
```

## Development Plan (MVP First)

1. Setup auth system (register/login)
2. Build event CRUD APIs
3. Create calendar view with event display
4. Add modals for create/edit
5. Optional: Recurrence, time zones, reminders

---

## License

This project is for technical assessment and demonstration purposes.
