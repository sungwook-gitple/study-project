// import { roomModel } from '@/src/db/model/room';
import { roomModel } from '@/src/db/model/room';
import { config } from '../../config';
import { MyMqttImpl } from './chattingMq.controller';
import { RoomServiceImpl } from './room.services';

export const chattingMqtt = MyMqttImpl.getInstance({
  host: config.mqtt.HOST,
  port: config.mqtt.PORT
});

export const roomService = new RoomServiceImpl(roomModel);
