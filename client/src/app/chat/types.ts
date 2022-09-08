export interface Chat {
  id?: string;
  message: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  roomId: string;
  isTransferred: boolean;
}

export interface IChatComponent {
  chats: Chat[];
  userId: string;

  isMe(createdBy: string): boolean;
  leaveRoom(): void;
}
