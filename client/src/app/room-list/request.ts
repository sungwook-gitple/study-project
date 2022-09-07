import { http } from 'src/http';
import { ServerResponse } from '../../http/types';

export async function requestRoomList() {
  const result = await http.get('/rooms')
    .then(r => r.data);

  return result;
}

export async function requestEnterRoom(id): Promise<ServerResponse> {
  return http.put(`/rooms/${id}/enter`)
    .then(r => r.data);
}

export async function requestLeaveRoom(id): Promise<ServerResponse> {
  return http.put(`/rooms/${id}/leave`)
    .then(r => r.data);
}
