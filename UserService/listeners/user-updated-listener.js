const { HexaListener } = require('./hexa-listener');
const Topics = require('../events/event-topics');
 
class UserUpdatedListener extends HexaListener{
    constructor() {
      super(Topics.UserUpdatedTopic);
    }
}

module.exports = { UserUpdatedListener };
