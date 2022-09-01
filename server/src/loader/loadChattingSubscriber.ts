import { config } from '../config';
import { chattingMqtt } from '../mqtt';

const CHATTING_TOPIC = 'hello';
const host = config.mqtt.HOST;
const port = config.mqtt.PORT;

export async function loadChattingSubscriber () {

  // const client = mqtt.connect({
  //   host,
  //   port,
  // });

  // client.on('connect', () => {
  //   console.log(`chatting subscriber connected ${host}:${port}`);
  //   client.subscribe(CHATTING_TOPIC);
  //   console.log(`subscribe topic:`, CHATTING_TOPIC);
  // });

  // client.on('message', (topic, payload) => {

  //   console.log('message:', payload.toString());
  // });

  chattingMqtt.connect();
}
