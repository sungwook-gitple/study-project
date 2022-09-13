import { AxiosError } from 'axios';
import { http } from 'src/http';
import { ServerResponse } from '../../http/types';
import { RoomRequest } from './types';

export async function requestRoomList() {

  const result = await http.get('/rooms')
    .then(r => r.data);

  return result;
}

export async function requestEnterRoom(id: string): Promise<ServerResponse> {

  return http.put(`/rooms/${id}/enter`)
    .then(r => r.data);
}

export async function requestLeaveRoom(id: string): Promise<ServerResponse> {

  return http.put(`/rooms/${id}/leave`)
    .then(r => r.data);
}

export async function requestRemoveRoom(id: string): Promise<ServerResponse> {

  return http.delete(`/rooms/${id}`)
    .then(r => ({
      result: 'success' as const,
      data: r.data,
    }))
    .catch((err: AxiosError) => {
      console.error(err);
      return {
        result: 'fail',
        message: err.message,
        data: err,
      };
    });
}

export async function requestRoomById(id: string): Promise<ServerResponse> {

  return http.get(`/rooms/${id}`)
    .then(r => {
      return {
        result: 'success' as const,
        data: r.data,
      };
    })
    .catch((err: AxiosError) => {
      console.error(err);
      return {
        result: 'fail' as const,
        message: `방 정보를 불러오는데 실패했습니다.`,
        data: err
      };
    });
}

export async function requestCreateRoom(room: RoomRequest): Promise<ServerResponse> {

  return http.post('/rooms', room).then(r => {

    return {
      result: 'success' as const,
      data: r.data,
    };
  })
  .catch((err: AxiosError) => {
    console.error(err);
    return {
      result: 'fail' as const,
      message: '방 생성 실패',
      data: err
    };
  });
}
