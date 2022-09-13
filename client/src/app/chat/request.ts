import { http } from 'src/http';

export function requestChats() {
  return http.get('/chattings');
}
