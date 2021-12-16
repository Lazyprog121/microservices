const { Kafka } = require("kafkajs")
const http = require('http');

const getRandomInt = (max) => Math.floor(Math.random() * max)

const kafka = new Kafka({ 
  clientId: "root-service", 
  brokers: ["kafka:9092"]
 })
const producer = kafka.producer()

const produce = async (action, message) => {
	await producer.connect()

	try {
		await producer.send({
			topic: 'game',
			messages: [
				{
					key: action,
					value: message,
				},
			],
		})

		console.log(`Message: ${message}`)
	} catch (err) {
		console.error("Message was not sent: " + err)
	}
}


const url = '/api/root-service'
const actions = {
	fight: 'fight',
	bonus: 'bonus'
}
const requestListener = function (req, res) {
	res.writeHead(200)

    if (req.url === url) {
        res.write('Hello from root-service')
    } else if (req.url === `${url}/${actions.fight}`) {
		const maxDamage = 10
		const data = {
			action: actions.fight,
			fighter1: getRandomInt(maxDamage),
			fighter2: getRandomInt(maxDamage)
		}
        produce(actions.fight, JSON.stringify(data))
		res.write(JSON.stringify(data))
    } else if (req.url === `${url}/${actions.bonus}`) {
        const maxHealth = 5
		const data = {
			action: actions.bonus,
			fighter1: getRandomInt(maxHealth),
			fighter2: getRandomInt(maxHealth)
		}
        produce(actions.bonus, JSON.stringify(data))
		res.write(JSON.stringify(data))
    } else {
        res.writeHead(404)
    }
    res.end()
}

const server = http.createServer(requestListener);
server.listen(8080);