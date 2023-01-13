
const { Kafka } = require('kafkajs')

require('dotenv').config();

const kafkaClient = new Kafka({
  clientId: process.env.SERVICE_NAME ,
  brokers: ['kafka:9092'],
})

const kafkaProducer = kafkaClient.producer();

kafkaProducer.connect().then( () => {
    console.log('Kafka producer connected.');
});

const publishEvent = (topic,data) => {
    console.log('Topic :', topic);
    return kafkaProducer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(data) }]
    })
}

const createConsumer = () => {
    const consumer = kafkaClient.consumer({ groupId: process.env.SERVICE_NAME });
    return consumer;
}

module.exports = {publishEvent,createConsumer};

