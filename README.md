# Event Calendar App – Monorepo

<!-- prettier-ignore-start -->
```

                            _     __                    _
                           / |_  [  |                  (_)
 .---. _   __ .---. _ .--.`| |-'  | |--.  .--.  _ .--. __  ____  .--.  _ .--.
/ /__\[ \ [  / /__\[ `.-. || |    | .-. / .'`\ [ `/'`\[  |[_   / .'`\ [ `.-. |
| \__.,\ \/ /| \__.,| | | || |,   | | | | \__. || |    | | .' /| \__. || | | |
 '.__.' \__/  '.__.[___||__\__/  [___]|__'.__.'[___]  [___[_____'.__.'[___||__]


```
<!-- prettier-ignore-end -->

[![Netlify Status](https://api.netlify.com/api/v1/badges/7e49c57e-3cc8-48c1-bb94-9ed175fe5c82/deploy-status)](https://app.netlify.com/projects/nw-event-calendar-app-client/deploys)
[![CodeQL](https://github.com/NelakaWith/event-calendar-app/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/NelakaWith/event-calendar-app/actions/workflows/github-code-scanning/codeql)
[![Client CI](https://github.com/NelakaWith/event-calendar-app/actions/workflows/client-ci.yml/badge.svg)](https://github.com/NelakaWith/event-calendar-app/actions/workflows/client-ci.yml)
[![Backend CI](https://github.com/NelakaWith/event-calendar-app/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/NelakaWith/event-calendar-app/actions/workflows/backend-ci.yml)

A full-stack web app to schedule, view, and manage events via an interactive calendar interface.

## Tech Stack

- **Frontend:** Vue 3, Vite, Tailwind CSS, Vue Router, Sass/SCSS (deployed on Netlify)
- **Backend:** Express.js (ES modules), Sequelize ORM, MySQL (deployed on Railway)
- **Authentication:** JWT, bcrypt, cookies
- **Utilities:** dotenv, morgan, cookie-parser

---

## Deployment Overview

- **Frontend (App):**

  - Deployed to [Netlify](https://nw-event-calendar-app-client.netlify.app/)
  - Auto-deploys on merge to `main` branch
  - Uses environment variables for API base URL

- **Backend (API):**

  - Deployed to [Railway](https://railway.app/)
  - Exposes REST API endpoints for authentication and events
  - Uses Railway environment variables for DB and secrets

- **Database:**
  - MySQL database hosted on Railway
  - Accessible by the backend API

---

## Folder Structure

```
client/           # Vue 3 frontend (Vite)
  src/
    components/
    router/
    scss/
    store/
    views/
    App.vue
    main.js
  public/
  package.json
  README.md
  .env

server/           # Express backend (ESM)
  src/
    controllers/
    middleware/
    models/
    routes/
    _db/
  index.js
  package.json
  README.md
  .env

README.md         # Monorepo/project overview
```

---

## Setup Instructions

### 1. Database (MySQL on Railway)

- Create your database on Railway and note the connection details.
- Import schema and sample data using the Railway SQL console or MySQL CLI:
  ```powershell
  mysql -h <host> -P <port> -u <user> -p<password> <database> < server/src/_db/db_schema.sql
  mysql -h <host> -P <port> -u <user> -p<password> <database> < server/src/_db/db_sample_data.sql
  ```

### 2. Backend (Express API on Railway)

- Deploy the `server` folder to Railway as a Node.js service.
- Set environment variables in Railway for DB connection and JWT secrets.
- The API will be available at the Railway-provided URL (e.g., `https://your-api.up.railway.app`).

### 3. Frontend (Vue on Netlify)

- Deploy the `client` folder to Netlify.
- Set `VITE_API_BASE_URL` in Netlify environment variables to your Railway API URL (e.g., `https://your-api.up.railway.app`).
- Netlify will auto-deploy on merge to `main`.

---

## Environment Variables

- **Frontend (Netlify):**
  - `VITE_API_BASE_URL=https://your-api.up.railway.app`
- **Backend (Railway):**
  - `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_DIALECT=mysql`
  - `JWT_SECRET`, `JWT_SECRET_CURRENT`, `JWT_SECRET_PREVIOUS`
  - `CORS_ORIGIN=https://your-netlify-app.netlify.app`

---

## Features

- User authentication (register/login/logout)
- Event CRUD APIs (create, read, update, delete)
- Calendar view (FullCalendar integration)
- Modular code structure for easy extension
- Environment-based configuration
- CI/CD: Code auto-deploys to Netlify on merge to `main`

---

## License

This project is for technical assessment and demonstration purposes.
