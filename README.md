# Event Calendar App – Monorepo

A full-stack web app to schedule, view, and manage events via an interactive calendar interface.

## Tech Stack

- **Frontend:** Vue 3, Vite, Tailwind CSS, Vue Router, Sass/SCSS
- **Backend:** Express.js (ES modules), Sequelize ORM, MySQL
- **Authentication:** JWT, bcrypt, cookies
- **Utilities:** dotenv, morgan, cookie-parser
- **Serverless:** Netlify Functions (Express API as serverless)

---

## Folder Structure

```
client/           # Vue 3 frontend (Vite)
  src/
    components/
      AppFormError.vue
      AppHeader.vue
      AppInputGroup.vue
    router/
      index.js
    scss/
      _common.scss
      main.scss
    store/
      auth.js
    views/
      AppCalendar.vue
      AppHome.vue
      AppLogin.vue
      AppRegister.vue
    App.vue
    main.js
  public/
  package.json
  README.md
  .env

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
  .env

netlify/
  functions/
    api.js
netlify.toml

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

### 2. Local Development (Traditional Servers)

#### Backend (Express API)

```powershell
cd server
npm install
npm run dev   # For development (nodemon)
# or
npm start     # For production
```

- The server runs by default on http://localhost:3001
- Edit `server/.env` for DB credentials, JWT secret, and CORS_ORIGIN if needed

#### Frontend (Vue)

```powershell
cd client
npm install
npm run dev
```

- The frontend runs by default on http://localhost:5173
- Edit `client/.env` for API base URL (see below)

#### Start Both Servers (Windows Only)

Double-click or run in PowerShell:

```powershell
start_servers.cmd
```

---

### 3. Netlify Serverless Deployment

#### a. **Serverless API**

- The Express backend is deployed as a Netlify Function using `serverless-http`.
- Function entry: `netlify/functions/api.js`
- All `/api/*` requests are proxied to this function via `netlify.toml`.

#### b. **Frontend**

- The Vue app is built and published from `client/dist`.

#### c. **Environment Variables**

- For Netlify Functions, set all backend environment variables (DB, JWT, etc.) in the Netlify dashboard or in a root `.env` for local `netlify dev`.
- For the client, set public variables (e.g., `VITE_API_BASE_URL=/`) in `client/.env`.

#### d. **netlify.toml**

```toml
[build]
  functions = "netlify/functions"
  publish = "client/dist"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### e. **Local Netlify Dev**

```powershell
netlify dev
```

- This will run both the frontend and the serverless backend locally.
- Ensure you have a root `.env` with all backend variables for local dev.

---

## Features

- User authentication (register/login/logout)
- Event CRUD APIs (create, read, update, delete)
- Calendar view (FullCalendar integration)
- Modular code structure for easy extension
- Environment-based configuration
- Netlify Functions serverless backend support

---

## License

This project is for technical assessment and demonstration purposes.
