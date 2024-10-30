const mqtt = require('mqtt')
const dotenv = require("dotenv")

dotenv.config()

const host = 'eu1.cloud.thethings.network'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'reclaimers-application@ttn',
  password: process.env.MQTT_PASSWORD,
  reconnectPeriod: 1000,
})

const topic = '#'

client.on('connect', () => {
  console.log('Connected')

  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
    // client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    //   if (error) {
    //     console.error(error)
    //   }
    // })
  })
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
  console.log('\n-------------------------------------------\n')
})
