import { Room } from '@/src/components/chatting/types';
import mongoose, { Model, Schema } from 'mongoose';

export const roomSchema = new Schema<Room>({
  title: String,
  members: [{
    userId: String,
    name: String,
  }],
  createdBy: String,
  createdAt: Date,
}, {
  timestamps: true
});

export const roomModel = mongoose.model<Room, Model<Room, {}, {}>>('Room', roomSchema);
