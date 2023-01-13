const {publishEvent} = require("../utils/kafka");

class HexaPublisher {
  constructor(hexaEvent) {
    this.topic = hexaEvent.topic;
    this.data = hexaEvent.data;
  }
  publish() {
    console.log(this.topic,':',this.data);
    return publishEvent(this.topic, this.data);
  }
}

module.exports = { HexaPublisher };
