const { HexaListener } = require('./hexa-listener');
const Topics = require('../events/event-topics');
 
class PasswordChangedListener extends HexaListener{
    constructor() {
      super(Topics.PasswordForgotTopic);
    }
}

module.exports = { PasswordChangedListener };

