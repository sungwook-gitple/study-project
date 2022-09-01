import { config } from '../config';
import { MyMqttImpl } from './myMqtt';

export const chattingMqtt = MyMqttImpl.getInstance({
  host: config.mqtt.HOST,
  port: config.mqtt.PORT
});