const { Kafka } = require("kafkajs")

const kafka = new Kafka({ 
  clientId: "root-service", 
  brokers: ["kafka:9092"]
 })
const producer = kafka.producer()

const produce = async () => {
	await producer.connect()

  	let counter = 0
	setInterval(async () => {
		try {
			await producer.send({
				topic: "best-topic",
				messages: [
					{
						key: `key-${counter}`,
						value: `best message for consumers №${counter}`,
					},
				],
			})

			console.log(`Message: ${counter}`)
			counter++
		} catch (err) {
			console.error("Message was not sent: " + err)
		}
	}, 1000)
}

produce()