const {HexaEvent,Topics} = require('./hexa-event');

class PasswordChangedEvent extends HexaEvent {
    constructor(updatedUser) {
        super(Topics.PasswordForgotTopic);
        this.data = updatedUser;
    } 
};

module.exports = {PasswordChangedEvent};