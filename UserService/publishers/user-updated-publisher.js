const { HexaPublisher } = require('./hexa-publisher');
const { UserUpdatedEvent } = require('../events/user-updated-event');
 
class UserUpdatedPublisher extends HexaPublisher{
    constructor(user) {
      const event = new UserUpdatedEvent(user);  
      super(event);
    }
}

module.exports = {UserUpdatedPublisher};
