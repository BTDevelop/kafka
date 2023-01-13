const {HexaPublisher} = require('./hexa-publisher');
const {UserCreatedEvent} = require('../events/user-created');
 
class UserCreatedPublisher extends HexaPublisher{
    constructor(user) {
      const event = new UserCreatedEvent(user);  
      super(event);
    }
}

module.exports = {UserCreatedPublisher};