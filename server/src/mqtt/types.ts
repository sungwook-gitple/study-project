import { MqttClient } from 'mqtt';

export interface MyMqttOption {
  host: string;
  port: number;
}

export interface MyMqtt {
  client?: MqttClient;
  connect(): MqttClient;
}