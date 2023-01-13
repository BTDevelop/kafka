class HexaError extends Error {
    statusCode = 500;
    constructor(message) {
      super(message); 
      this.name = "ServerError"; 
    }
    serializeError() {
      return {
        name: this.name,
        message: this.message,
        errorCode: this.statusCode,
      };
    }
  }
  module.exports = { HexaError };
  