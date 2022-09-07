import { http } from '.';

export function updateHttpAuthorization(token) {

  http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
