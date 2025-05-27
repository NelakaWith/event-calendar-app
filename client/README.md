# Event Calendar App – Client

This is the frontend for the Event Calendar App, built with Vue 3, Vite, and Tailwind CSS.

## Features

- Vue Router for navigation (Home, Login, Register, Calendar)
- SCSS/Sass support
- API integration with Express backend

## Project Structure

```
client/
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
```

## Setup

```powershell
cd client
npm install
npm run dev
```

The app will run at http://localhost:5173 by default.

---

## Notes

- Update API endpoints in your code to match your backend server if needed.
- You can add more routes and components as your app grows.
