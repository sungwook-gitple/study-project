import { Injectable } from '@angular/core';
import * as mqtt from 'mqtt/dist/mqtt.min';
import { MqttService } from 'ngx-mqtt';
import { CHATTING_TOPIC } from 'src/app/chat/constants';
import { MyMqttClientV2 } from './types';

type MqttClient = mqtt.MqttClient;

@Injectable()
export class MyMqttClientImplV2 implements MyMqttClientV2 {

  constructor(
    private readonly mqttService: MqttService,
  ) {}

  topic(topic: string) {
    return this.mqttService.observe(topic);
  }

  setRoomId(roomId: string) {
    const roomTopic = `${CHATTING_TOPIC}/${roomId}`;
    return this.mqttService.observe(roomTopic);
  }

  subscribeRoom(roomId, cb) {
    const roomTopic = `${CHATTING_TOPIC}/${roomId}`;
    return this.topic(roomTopic).subscribe(cb);
  }

  publish<T extends Record<string, any>>(topic: string, payload: T): void {
    this.mqttService.unsafePublish(topic, JSON.stringify(payload));
  }
  publishError<T extends Record<string, any>>(payload: T): void {
    this.mqttService.unsafePublish(CHATTING_TOPIC, JSON.stringify(payload));
  }
}
