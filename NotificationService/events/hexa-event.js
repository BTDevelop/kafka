const Topics = require('./event-topics');
class HexaEvent {
    constructor(topic) {
        this.topic = topic;
        this.data = null;
    } 
}
module.exports = { HexaEvent, Topics };