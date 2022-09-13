import axios from 'axios';
import { getAuthorizationToken } from 'src/app/authenticated/util';
import config from 'src/config';

const { server } = config;

const http = axios.create({
  baseURL: `http://${server.HOST}:${server.PORT}`,
  withCredentials: true,
});

http.interceptors.request.use(config => {

  const headers = config.headers;
  const token = headers.Authorization || getAuthorizationToken();

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  };
  // return config;
}, function(err: Error) {
  console.error('on request', err);

  return Promise.reject(err);
});


export { http };
