import mongoose, { Model, Schema } from 'mongoose';

export interface ChattingSchema {
  _id: string;
  roomId: string;
  message: string;
  createdBy: string;
  createdAt: string;
}

export const chattingSchema = new Schema<ChattingSchema, {}, {}>({
  roomId: Schema.Types.ObjectId,
  message: String,
  createdBy: Schema.Types.ObjectId,
  createdAt: String,
});

export const ChattingModel = mongoose.model<ChattingSchema, Model<ChattingSchema>, {}>('Chatting', chattingSchema);
