const { Kafka } = require("kafkajs")
const http = require('http');

const kafka = new Kafka({
    clientId: 'service1',
    brokers: ['kafka:9092']
  })
const consumer = kafka.consumer({ groupId: 'service1' })


const keys = {
	fight: 'fight',
	bonus: 'bonus'
}

let fighter1 = {
  hp: 100
}

let fighter2 = {
  hp: 100
}

let wins = {
  fighter1: 0,
  fighter2: 0
}

const consume = async () => {
    try {
      await consumer.connect()
      await consumer.subscribe({ topic: 'game' })
        
      await consumer.run({
        eachMessage: async ({ message }) => {
          const data = JSON.parse(message.value)

          if (data.action === keys.fight) {
            fighter1.hp -= data.fighter1
            fighter2.hp -= data.fighter2
          } else if (data.action === keys.bonus) {
            fighter1.hp += data.fighter1
            fighter2.hp += data.fighter2
          }
  
          if (fighter1.hp < 1) {
            wins.fighter2 += 1
            fighter1.hp = 100
            fighter2.hp = 100
          } else if (fighter2.hp < 1) {
            wins.fighter1 += 1
            fighter1.hp = 100
            fighter2.hp = 100
          }
        },
      })
    } catch {
      console.log("error")
    }
}

consume()


const url = '/api/service1'
const actions = {
	statistic: 'statistic'
}
const requestListener = function (req, res) {
  res.writeHead(200);

    if (req.url === url) {
        res.write('Hello from service1');
    } else if (req.url === `${url}/${actions.statistic}`) {
      const stat = {
        fighter1,
        fighter2,
        wins
      }
      res.write(JSON.stringify(stat))
    } else {
        res.writeHead(404);
    }
    res.end()
}

const server = http.createServer(requestListener);
server.listen(8080);