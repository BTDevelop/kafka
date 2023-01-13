const { HexaEvent,Topics } = require('./hexa-event');

class UserUpdatedEvent extends HexaEvent {
    constructor(user) {
        super(Topics.UserUpdatedTopic);
        this.data = user;
    } 
};

module.exports = { UserUpdatedEvent };
