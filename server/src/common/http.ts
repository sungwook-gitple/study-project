import axios from 'axios';
import { config } from '../config';

const { HOST, PORT } = config.server;
const baseUrl = `http://${HOST}:${PORT}`;

export const http = axios.create({
  baseURL: baseUrl,
});