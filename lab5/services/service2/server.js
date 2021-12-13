import { Kafka } from "kafkajs";
import fetch from "node-fetch";

const Timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });


const getConfig = async (path) => {
  try {
    const result = await fetch(path).then((data) => data.text());
    
    return JSON.parse(result.split('=>').join(':'));
  } catch (error) {
    console.log(error);
    
    return await Timeout(1000).then(() => getConfig(path));
  }
};
const start = async () => {
    const env = await getConfig("http://webapp:8080");

    const kafka = new Kafka({
      clientId: 'service2',
      brokers: [env.broker]
    })
    const consumer = kafka.consumer({ groupId: 'service2' })

    const consume = async () => {
      await consumer.connect();
      await consumer.subscribe({ topic: env.topic });

      await consumer.run({
        eachMessage: async ({ message }) => {
          console.log(message.value)
        },
      })
    };

    consume();
}

start()