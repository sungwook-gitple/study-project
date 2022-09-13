import { MqttClient } from 'mqtt';
import { IMqttMessage } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/chat/types';

export interface MyMqttClient {
  client?: MqttClient;
  connect(): MqttClient;
  publish<T extends Record<string, any>>(topic: string, payload: T): void;
  publishError<T extends Record<string, any>>(payload: T): void;
}

export interface MyMqttClientV2 {
  client?: MqttClient;
  topic(topic: string): Observable<IMqttMessage>;
  publish<T extends Record<string, any>>(topic: string, payload: T): void;
  publishError<T extends Record<string, any>>(payload: T): void;
}

export interface MyMqttClientOption {
  HOST: string;
  PORT: number;
  WS_PORT: number;
}

export interface MyMqttClient {
  updateChat(chat: Chat): void;
}
