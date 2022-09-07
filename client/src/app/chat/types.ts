export interface Chat {
  message: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  roomId: string;
}

export interface IChatComponent {
  chats: Chat[];
  userId: string;

  isMe(createdBy: string): boolean;
}
