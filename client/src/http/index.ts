import axios from 'axios';
import { getAuthorizationToken } from 'src/app/authenticated/util';
import config from 'src/config';

const { server } = config

const http = axios.create({
  baseURL: `http://${server.HOST}:${server.PORT}`,
  withCredentials: true,
})

export { http }
