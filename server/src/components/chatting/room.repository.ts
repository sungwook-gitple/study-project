import { roomModel } from '@/src/db/model/room';

export async function findByIdAndCreatedBy(id: string, createdBy: string) {
  return roomModel.find({
    _id: id,
    createdBy
  });
}
