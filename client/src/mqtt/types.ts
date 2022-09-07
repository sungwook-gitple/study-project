import { MqttClient } from 'mqtt';
import { Chatting } from 'src/app/chat/types';

export interface MyMqttClient {
  client?: MqttClient;
  connect(): MqttClient;
  publish<T extends Record<string, any>>(topic: string, payload: T): void;
  publishError<T extends Record<string, any>>(payload: T): void;
}

export interface MyMqttClientOption {
  HOST: string;
  PORT: number;
  WS_PORT: number;
}

export interface MyMqttClient {
  updateChat(chat: Chatting): void
}