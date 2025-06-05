# Event Calendar App – Server

This is the backend for the Event Calendar App, built with Express.js, Sequelize, and MySQL. Now supports deployment as a Netlify serverless function.

## Features

- User authentication (register, login, logout) with JWT and cookies
- Event CRUD API (create, read, update, delete)
- Sequelize ORM models for User and Event
- JWT middleware for route protection
- Environment-based configuration via .env
- **Serverless support:** Deploy as a Netlify Function using `serverless-http`

## Project Structure

```
server/
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
  .env
```

## Setup (Local Development)

1. Configure your `.env` file with database and JWT settings.
2. Install dependencies:
   ```powershell
   cd server
   npm install
   ```
3. Start the server:
   ```powershell
   npm run dev
   ```
   The server will run at http://localhost:3001 by default.

---

## Netlify Serverless Deployment

- The Express app is exported from `index.js` and used in `netlify/functions/api.js` via `serverless-http`.
- All environment variables must be set in the Netlify dashboard or in a root `.env` for local Netlify dev.
- The server will **not** listen on a port when running as a Netlify function.

---

## Notes

- Make sure your MySQL server is running and the schema is loaded.
- Update CORS_ORIGIN in `.env` to match your frontend URL if needed.
- For Netlify, ensure all DB and secret variables are available to the function.
