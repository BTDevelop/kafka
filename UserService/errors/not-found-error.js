const { HexaError } = require("./hexa-error");

class NotFoundError extends HexaError {
  statusCode = 404;
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

module.exports = { NotFoundError };
