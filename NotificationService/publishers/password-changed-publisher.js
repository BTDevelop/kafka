const { HexaPublisher } = require('./hexa-publisher');
const { PasswordChangedEvent } = require('../events/password-changed');
 
class PasswordChangedPublisher extends HexaPublisher{
    constructor(updatedUser) {
      const event = new PasswordChangedEvent(updatedUser);  
      super(event);
    }
}

module.exports = {PasswordChangedPublisher};
