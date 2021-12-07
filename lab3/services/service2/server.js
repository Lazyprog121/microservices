const { Kafka } = require("kafkajs")

const kafka = new Kafka({
    clientId: 'service2',
    brokers: ['kafka:9092']
  })
const consumer = kafka.consumer({ groupId: 'service2' })

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