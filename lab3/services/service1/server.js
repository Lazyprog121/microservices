const { Kafka } = require("kafkajs")

const kafka = new Kafka({
    clientId: 'service1',
    brokers: ['kafka:9092']
  })
const consumer = kafka.consumer({ groupId: 'service1' })

const consume = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'best-topic' })
      
    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(message.value)
      },
    })
}

consume();