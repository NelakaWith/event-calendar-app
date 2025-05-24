# Event Calendar App

A full-stack web app to schedule, view, and manage events via an interactive calendar interface.

## Tech Stack

- **Frontend:** Vue 3, Vite, Tailwind CSS, FullCalendar (planned)
- **Backend:** Express.js (ES modules), Sequelize ORM, MySQL
- **Authentication:** JWT, bcrypt, cookies
- **Utilities:** dotenv, morgan, cookie-parser

---

## Folder Structure

```
client/           # Vue 3 frontend (Vite)
  src/
    components/
    assets/
    App.vue
    main.js
    style.css
  public/
  package.json

server/           # Express backend (ESM)
  src/
    _db/
      db_schema.sql        # MySQL schema
      db_sample_data.sql   # Sample data
  index.js
  package.json
```

---

## Setup Instructions

### 1. Database (MySQL)

- Create the database and tables:
  1. Open a MySQL client (e.g., MySQL Workbench, CLI)
  2. Run the schema script:
     ```sql
     SOURCE server/src/_db/db_schema.sql;
     ```
  3. (Optional) Add sample data:
     ```sql
     SOURCE server/src/_db/db_sample_data.sql;
     ```

### 2. Backend (Express API)

```powershell
cd server
npm install
npm run dev   # For development (nodemon)
# or
npm start     # For production
```

- The server runs by default on http://localhost:3001
- Edit `.env` for DB credentials if needed (add this file manually)

### 3. Frontend (Vue)

```powershell
cd client
npm install
npm run dev
```

- The frontend runs by default on http://localhost:5173

---

## Development Plan (MVP)

1. User authentication (register/login)
2. Event CRUD APIs
3. Calendar view with event display
4. Modals for create/edit
5. (Optional) Recurrence, time zones, reminders

---

## License

This project is for technical assessment and demonstration purposes.
