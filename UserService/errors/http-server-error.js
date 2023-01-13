const { HexaError } = require("./hexa-error");

class HttpServerError extends HexaError {
  statusCode = 500;
  constructor(message, errReason) {
    super(message);
    this.name = "HttpServerError";
    this.reason = errReason;
  }
  serializeError() {
    return {
      name: this.name,
      message: this.message,
      errorCode: this.statusCode,
      reason: this.reason,
    };
  }
}

module.exports = { HttpServerError };
