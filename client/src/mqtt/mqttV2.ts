import { Inject, Injectable } from '@angular/core';
import * as mqtt from 'mqtt/dist/mqtt.min';
import { MqttService } from 'ngx-mqtt';
import { CHATTING_TOPIC } from 'src/app/chat/constants';
import { Chat } from 'src/app/chat/types';
import { MyMqttClientOption, MyMqttClientV2 } from './types';
import { validateRequired } from './util';

type MqttClient = mqtt.MqttClient;

@Injectable()
export class MyMqttClientImplV2 implements MyMqttClientV2 {

  constructor(
    @Inject('mqttOptions') private readonly mqttOptions: MyMqttClientOption,
    private readonly mqttService: MqttService,
  ) {
    this.connect();
  }
  client?: MqttClient;

  updateChat: (chat: Chat) => void = () => {};

  topic(topic: string) {
    return this.mqttService.observe(topic);
  }

  connect(username?: string, password?: string): MqttClient {

    console.log('connecting to mqtt...', username);
    const url = `http://${this.mqttOptions.HOST}`;
    const client = mqtt.connect(url, {
      clientId: 'abc',
      username: username || 'swkim@gitplecorp.com',
      // password: '{USER_TOKEN}' // TODO - user token
      // path: '/ws',
      protocol: 'ws',
      port: this.mqttOptions.WS_PORT,
      // port: 443,
      clean: true,
      keepalive: 60 * 5,
      reconnectPeriod: 500
    });
    this.client = client;

    client.on('connect', () => {
      console.log(`chatting subscriber connected ${this.mqttOptions.HOST}:${this.mqttOptions.PORT}`);
      // client.subscribe(CHATTING_TOPIC);
      // console.log(`subscribe topic:`, CHATTING_TOPIC);
    });

    client.on('message', async (topic, payload) => {
console.log('=== message', topic, payload);
try {
        const jsonPayload = JSON.parse(payload.toString());
        if (typeof jsonPayload !== 'object') {
          console.error('object error');
          return;
        }

        const validation = validateRequired<Chat>(jsonPayload, ['createdAt', 'createdBy', 'message']);
        if (validation.result === 'fail') {
          this.publishError(validation);
          console.error('required:', validation.missed);
          return;
        }
        if (typeof validation.data.createdBy === 'number') {
          this.publishError(validation);
          console.error('type error:', 'createdBy:', typeof validation.data.createdBy);
          return;
        }

        console.log('validation.data.message', validation.data.message);
        this.updateChat(validation.data);

      } catch (e) {
        console.error(e);
        const { message } = e as Error;
        this.publishError({
          result: false,
          message,
        });
      }
    });

    return client;
  }

  subscribe(roomId) {
    const roomTopic = `${CHATTING_TOPIC}/${roomId}`;
    this.client.subscribe(roomTopic);
  }

  subscribeRoom(roomId, cb) {
    const roomTopic = `${CHATTING_TOPIC}/${roomId}`;
    this.client.subscribe(roomTopic);
    this.updateChat = cb;
  }

  publish<T extends Record<string, any>>(topic: string, payload: T): void {
    this.client.publish(topic, JSON.stringify(payload));
  }
  publishError<T extends Record<string, any>>(payload: T): void {
    this.client.publish(CHATTING_TOPIC, JSON.stringify(payload));
  }

}
