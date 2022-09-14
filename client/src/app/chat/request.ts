import { http } from 'src/http';
import { ServerResponse } from 'src/http/types';

export function requestChats(roomId: string): Promise<ServerResponse> {
  return http.get(`/rooms/${roomId}/chats`)
    .then(r => {
      return {
        result: 'success' as const,
        data: r.data.data
      };
    });
}
