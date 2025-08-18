// server/src/services/errors.js
export class ServiceError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServiceError";
  }
}

export class ValidationError extends ServiceError {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends ServiceError {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends ServiceError {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
  }
}
