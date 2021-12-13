import { Kafka } from "kafkajs";
import fetch from "node-fetch";

const Timeout = (time) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(), time);
    });

const getConfig = async (pathToVault) => {
    try {
        const result = await fetch(pathToVault).then((data) => data.text());
        
        return JSON.parse(result.split("=>").join(":"));
    } catch (error) {
        console.log(error);
        
        return await Timeout(500).then(() => getConfig(pathToVault));
    }
};

const start = async () => {
    const env = await getConfig("http://webapp:8080");

    const kafka = new Kafka({ 
      clientId: "root-service", 
      brokers: [env.broker]
     })
    const producer = kafka.producer();

    const produce = async () => {
        await producer.connect();

        let counter = 0
        setInterval(async () => {
            try {
                await producer.send({
                    topic: env.topic,
                    messages: [
                      {
                          key: `key-${counter}`,
                          value: `best message for consumers №${counter}`,
                      },
                    ],
                });

                console.log(`Message: ${counter}`)
                counter++
            } catch (err) {
                console.error("Message was not sent: " + err)
            }
        }, 1000);
    };
    
    produce();
}

start()