# Event Calendar App – Monorepo

A full-stack web app to schedule, view, and manage events via an interactive calendar interface.

## Tech Stack

- **Frontend:** Vue 3, Vite, Tailwind CSS, Vue Router, Sass/SCSS
- **Backend:** Express.js (ES modules), Sequelize ORM, MySQL
- **Authentication:** JWT, bcrypt, cookies
- **Utilities:** dotenv, morgan, cookie-parser

---

## Folder Structure

```
client/           # Vue 3 frontend (Vite)
  src/
    components/
      Home.vue
      Login.vue
      Register.vue
      Calendar.vue
    router/
      index.js
    scss/
      main.scss
    App.vue
    main.js
  public/
  package.json
  README.md

server/           # Express backend (ESM)
  src/
    controllers/
      authController.js
      eventController.js
    middleware/
      jwt.middleware.js
    models/
      user.js
      event.js
    routes/
      authRoutes.js
      eventRoutes.js
    _db/
      db_schema.sql
      db_sample_data.sql
      sequelize.js
  index.js
  package.json
  README.md

start_servers.cmd # Script to start both servers in separate CMD windows
README.md         # Monorepo/project overview
requirements.txt  # Project requirements
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
- Edit `.env` for DB credentials, JWT secret, and CORS_ORIGIN if needed

### 3. Frontend (Vue)

```powershell
cd client
npm install
npm run dev
```

- The frontend runs by default on http://localhost:5173

### 4. Start Both Servers (Windows Only)

Double-click or run in PowerShell:

```powershell
start_servers.cmd
```

This will open two CMD windows: one for the backend and one for the frontend.

---

## Features

- User authentication (register/login/logout)
- Event CRUD APIs (create, read, update, delete)
- Calendar view (planned)
- Modular code structure for easy extension
- Environment-based configuration

---

## License

This project is for technical assessment and demonstration purposes.
