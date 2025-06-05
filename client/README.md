# Event Calendar App – Client

This is the frontend for the Event Calendar App, built with Vue 3, Vite, and Tailwind CSS.

## Features

- Vue Router for navigation (Home, Login, Register, Calendar)
- SCSS/Sass support
- API integration with Express backend (supports both local and Netlify serverless)
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
- For Netlify dev/serverless, set:
  ```
  VITE_API_BASE_URL=/
  ```
- For local development with a separate backend, set:
  ```
  VITE_API_BASE_URL=http://localhost:3001
  ```
- All API calls use relative URLs for environment-agnostic deployment.

---

## Netlify Integration

- The frontend is built and published from `client/dist`.
- All `/api/*` requests are proxied to the Netlify serverless function as configured in `netlify.toml`.
- Works seamlessly with the serverless Express backend.

---

## Notes

- Update API endpoints in your code to match your backend server if needed.
- You can add more routes and components as your app grows.
- For Netlify, ensure your `.env` is set up for the correct environment.
