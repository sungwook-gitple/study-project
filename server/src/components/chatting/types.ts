import { ServiceReturn } from '@/src/common/types';
import mongoose from 'mongoose';
import { MqttClient } from 'mqtt';

export type RoomServiceReturn = ServiceReturn;

export interface MyMqttOption {
  host: string;
  port: number;
}

export interface MyMqtt {
  client?: MqttClient;
  connect(): MqttClient;
  publish<T extends Record<string, any>>(topic: string, payload: T): void;
  publishError<T extends Record<string, any>>(payload: T): void;
}

export interface MyMqttClient {
  publish<T = Record<string, any>>(topic: string, payload: T): void;
}

export interface Chatting {
  message: string;
  createdBy: string;
  createdAt: Date;
  roomId: string;
}

export interface ChattingService {
  chattingModel: mongoose.Model<Chatting>;
  chattingSchema: mongoose.Schema<Chatting>;
}

export interface RoomService {
  create(room: Room): Promise<RoomServiceReturn>;
  list(): Promise<Room[]>;
  get(id: string): Promise<Room | null>;
  destroy(id: string): Promise<RoomServiceReturn>;
  enter(id: string, member: RoomMember): Promise<RoomServiceReturn>;
  leave(id: string, userId: string): Promise<RoomServiceReturn>;
}

export interface Room {
  title: string;
  members: RoomMember[];
  createdAt: string;
  createdBy: string;
}

export interface RoomMember {
  userId: string;
  name: string;
}
