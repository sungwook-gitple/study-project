import mongoose from 'mongoose';
import { Room, RoomMember, RoomService, RoomServiceReturn } from './types';

export class RoomServiceImpl implements RoomService {

  constructor(
    readonly roomModel: mongoose.Model<Room>
  ) {}

  async create(room: Room): Promise<RoomServiceReturn> {
    throw new Error('Method not implemented.');
  }

  list(): Promise<Room[]> {
    throw new Error('Method not implemented.');
  }
  async get(id: string) {
    const roomDoc = await this.roomModel.findById(id);

    return roomDoc && {
      id: roomDoc.id,
      title: roomDoc.title,
      members: roomDoc.members,
      createdBy: roomDoc.createdBy,
      createdAt: roomDoc.createdAt,
    };
  }

  destroy(id: string): Promise<RoomServiceReturn> {
    throw new Error('Method not implemented.');
  }
  async enter(id: string, member: RoomMember): Promise<RoomServiceReturn> {

    const existedRoom = await this.roomModel.findById(id)
      .catch(e => {
        console.error(e);
      });

    if (!existedRoom) {
      return {
        result: 'fail',
        message: 'not existed',
        data: { id }
      };
    }

    console.log('=== mem', member);
    const isExistedMember = existedRoom.members.some(m => m.userId === member.userId);
    if (isExistedMember) {
      return {
        result: 'success',
        message: '이미 입장한 사용자입니다.',
        data: { member }
      };
    }

    existedRoom.members.push(member);

    await existedRoom.save();

    return existedRoom
    ? {
      result: 'success',
      data: { existedRoom }
    }
    : {
      result: 'fail',
      message: '입장에 실패했습니다.',
      data: { id }
    };
  }

  async leave(id: string, userId: string): Promise<RoomServiceReturn> {

    const existedRoom = await this.roomModel.findById(id)
      .catch(e => {
        console.error(e);
      });

    if (!existedRoom) {
      return {
        result: 'fail',
        message: 'not existed',
        data: { id }
      };
    }

    existedRoom.members = existedRoom.members.filter(m => m.userId !== userId);

    await existedRoom.save();

    return {
      result: 'success',
      data: { id }
    };

  }
}