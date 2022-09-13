import axios from 'axios';
import { getAuthorizationToken } from 'src/app/authenticated/util';
import config from 'src/config';

const { server } = config;

const http = axios.create({
  baseURL: `http://${server.HOST}:${server.PORT}`,
  withCredentials: true,
});

http.interceptors.request.use(axiosConfig => {

  const headers = axiosConfig.headers;
  const token = headers.Authorization || getAuthorizationToken();

  return {
    ...axiosConfig,
    headers: {
      ...axiosConfig.headers,
      Authorization: `Bearer ${token}`
    }
  };
  // return config;
}, err => {

  console.error('on request', err);
  return Promise.reject(err);
});


export { http };
