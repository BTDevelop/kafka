const { HexaListener } = require('./hexa-listener');
const Topics = require('../events/event-topics');
 
class UserCreatedListener extends HexaListener{
    constructor() {
      super(Topics.UserCreatedTopic);
    }
}

module.exports = { UserCreatedListener };

