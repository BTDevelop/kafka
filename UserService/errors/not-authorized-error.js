const { HexaError } = require("./hexa-error");

class NotAuthorizedError extends HexaError {
  statusCode = 401;
  constructor(message) {
    super(message);
    this.name = "NotAuthorizedError";
  }
}

module.exports = { NotAuthorizedError };
