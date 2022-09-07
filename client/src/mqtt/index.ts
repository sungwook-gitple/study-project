import config from 'src/config';
import { MyMqttClientImpl } from './mqtt';

const chattingMqttClient = new MyMqttClientImpl({
  HOST: config.mqtt.HOST,
  PORT: config.mqtt.PORT,
  WS_PORT: config.mqtt.WS_PORT,
});

export { chattingMqttClient };
