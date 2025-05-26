# Event Calendar App – Server

This is the backend for the Event Calendar App, built with Express.js, Sequelize, and MySQL.

## Features

- User authentication (register, login, logout) with JWT and cookies
- Event CRUD API (create, read, update, delete)
- Sequelize ORM models for User and Event
- JWT middleware for route protection
- Environment-based configuration via .env

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
```

## Setup

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

## Notes

- Make sure your MySQL server is running and the schema is loaded.
- Update CORS_ORIGIN in `.env` to match your frontend URL if needed.
