require('dotenv').config({ path: '../.env' })
const wsPort = process.env.CHAT_MQTT_WS_PORT || 3999
console.log('=== wsPort', wsPort)

module.exports = {
  protos: ['tcp', 'ws'],
  host: '127.0.0.1',
  port: 1883,
  wsPort,
  wssPort: 4000,
  tlsPort: 8883,
  brokerId: 'aedes-cli',
  // credentials: './credentials.json',
  // persistence: {
  //   name: 'mongodb',
  //   options: {
  //     url: 'mongodb://127.0.0.1/aedes'
  //   }
  // },
  // mq: {
  //   name: 'mongodb',
  //   options: {
  //     url: 'mongodb://127.0.0.1/aedes'
  //   }
  // },
  key: null,
  cert: null,
  rejectUnauthorized: true,
  verbose: true,
  veryVerbose: false,
  noPretty: false
}
