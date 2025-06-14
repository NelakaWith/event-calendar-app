# Event Calendar App – Client

This is the frontend for the Event Calendar App, built with Vue 3, Vite, and Tailwind CSS.

## Deployment

- **Deployed on Netlify**
- Auto-deploys from the `main` branch on merge
- API and database are hosted on Railway
- [![Netlify Status](https://api.netlify.com/api/v1/badges/7e49c57e-3cc8-48c1-bb94-9ed175fe5c82/deploy-status)](https://app.netlify.com/projects/nw-event-calendar-app-client/deploys)

## Features

- Vue Router for navigation (Home, Login, Register, Calendar)
- SCSS/Sass support
- API integration with Express backend (hosted on Railway)
- Uses environment variables for API base URL

## Project Structure

```
client/
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
  .env
```

## Setup

```powershell
cd client
npm install
npm run dev
```

The app will run at http://localhost:5173 by default.

---

## API Base URL Configuration

- The API base URL is set via `client/.env` using the `VITE_API_BASE_URL` variable.
- For Netlify production, set:
  ```
  VITE_API_BASE_URL=https://your-api.up.railway.app
  ```
- For local development with a separate backend, set:
  ```
  VITE_API_BASE_URL=http://localhost:3001
  ```
- All API calls use relative URLs for environment-agnostic deployment.

---

## Netlify Integration

- The frontend is built and published from `client/dist`.
- All `/api/*` requests are proxied to the Railway-hosted backend API.
- Netlify auto-deploys on merge to `main`.

---

## Notes

- Update API endpoints in your code to match your backend server if needed.
- You can add more routes and components as your app grows.
- For Netlify, ensure your `.env` is set up for the correct environment.

---

## Prop Naming Convention

In all Vue components, prop names are defined in camelCase in the `<script>` section (e.g., `initialTitle`) and should be referenced in templates using kebab-case (e.g., `:initial-title="..."`).

Vue automatically normalizes these, so both work, but following this convention improves code readability and consistency for all contributors.
