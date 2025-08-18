// server/src/middleware/error.middleware.js
import {
  ServiceError,
  ValidationError,
  NotFoundError,
  ConflictError,
} from "../services/errors.js";

export function errorHandler(err, req, res, next) {
  // log full error diagnostics
  console.error("[ERROR HANDLER] name=", err && err.name);
  console.error(
    "[ERROR HANDLER] instanceof NotFoundError=",
    err instanceof NotFoundError
  );
  console.error(
    "[ERROR HANDLER] instanceof ServiceError=",
    err instanceof ServiceError
  );
  console.error(err && err.stack);
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }
  if (err instanceof ConflictError) {
    return res.status(409).json({ message: err.message });
  }
  if (err instanceof ServiceError) {
    return res.status(500).json({ message: err.message });
  }
  // Fallback
  return res.status(500).json({ message: err.message || "Internal error" });
}
