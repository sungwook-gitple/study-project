export type ServerResponse<T = any> = {
  result: 'success';
  message?: string;
  data: T;
} | {
  result: 'fail';
  message: string;
  data: Record<string, any>;
};
