export type ServerResponse = {
  result: 'success';
  message?: string;
  data: any;
} | {
  result: 'fail';
  message: string;
  data: Record<string, any>;
};
