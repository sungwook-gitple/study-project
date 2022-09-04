import { ChattingSchema } from '@/src/db/model/chatting';
import mongoose from 'mongoose';

export class ChattingService {

  constructor(
    readonly chattingModel: mongoose.Model<ChattingSchema>
  ) {}

}