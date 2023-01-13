const { HexaError } = require('./hexa-error');

class BadRequestError extends HexaError {
  statusCode = 400;
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
  }
}

module.exports = { BadRequestError };
