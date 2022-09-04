import { Request } from 'express';

export type ServiceReturn = {
  result: 'fail';
  message: string;
  data: Record<string, any>;
} | {
  result: 'success';
  message?: string
  data?: Record<string, any>;
};

export type AuthorizedRequest = Request & {
  user: {
    id: string
    name: string
  }
};
