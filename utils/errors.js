class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class dataAlreadyUseError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  AuthError,
  dataAlreadyUseError,
};
