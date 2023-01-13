const {HexaEvent,Topics} = require('./hexa-event');

class UserCreatedEvent extends HexaEvent {
    constructor(user) {
        super(Topics.UserCreatedTopic);
        this.data = user;
    } 
};

module.exports = {UserCreatedEvent};