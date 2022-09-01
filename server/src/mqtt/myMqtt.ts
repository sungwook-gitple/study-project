import mqtt, { MqttClient } from 'mqtt';
import { MyMqtt, MyMqttOption } from './types';

const CHATTING_TOPIC = 'hello';

export class MyMqttImpl implements MyMqtt {

  client?: MqttClient;

  constructor(
    readonly host: string,
    readonly port: number
  ) {}

  static getInstance(mqttOptions: MyMqttOption): MyMqtt {
    return new MyMqttImpl(mqttOptions.host, mqttOptions.port);
  }

  connect(): MqttClient {

    const client = mqtt.connect({
      host: this.host,
      port: this.port,
    });

    this.client = client;

    client.on('connect', () => {
      console.log(`chatting subscriber connected ${this.host}:${this.port}`);
      client.subscribe(CHATTING_TOPIC);
      console.log(`subscribe topic:`, CHATTING_TOPIC);
    });

    client.on('message', (topic, payload) => {

      console.log('message:', payload.toString());
    });

    return client;
  }


}