export interface Room {
  id: string;
  title: string;
  createdAt: Date;
  createdBy: string;
}

export interface RoomRequest {
  title: string;
  createdBy: string;
}
