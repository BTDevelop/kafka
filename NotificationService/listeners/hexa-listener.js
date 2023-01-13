const { createConsumer } = require("../utils/kafka");
const Queue = require("bull");
require("dotenv").config();

class HexaListener {
  constructor(topic) {
    this.topic = topic;
    this.consumer = null;
    this.backupQue = null;
    this.attempts = 10;
    this.queName = process.env.SERVICE_NAME + "-" + topic + '-retryQue';
    //console.log(this.queName);
  }
  async listen(callback) {
    this.consumer = createConsumer();
    await this.consumer.connect();
    await this.consumer.subscribe({
      topics: [this.topic],
      fromBeginning: true,
    });

    this.backupQue = new Queue(this.queName, process.env.REDIS_URI);

    this.backupQue.process(async (job) => {
      console.log("in job process");
      const result = await callback(
        job.data.topic,
        job.data.partition,
        job.data.msgData
      );
      console.log(job.attemptsMade);
      
      if (result) {
        return Promise.resolve();
      } else {
        if (job.attemptsMade === (this.attempts - 1)) {
          console.log('saving message for retry later');
          this.saveMessage(
            job.data.topic,
            job.data.partition,
            job.data.msgData
          );
        }
        return Promise.reject();
      }
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        const data = message.value.toString();
        const result = await callback(topic, partition, data);
        if (!result) {
          this.backupMessage(topic, partition, data);
        }
      },
    });
  }

  async backupMessage(topic, partition, data) {
    console.log(data);
    await this.backupQue.add(
      {
        topic: topic,
        partition: partition,
        msgData: data,
      },
      {
        delay: 1000,
        attempts: this.attempts,
        removeOnComplete: true,
        removeOnFail: true,
        backoff: {
          type: "exponential", // or 'fixed'
          delay: 1000, // first retry after 1s, second retry after 2s, 4s,...
        },
      }
    );
  }
}

module.exports = { HexaListener };
