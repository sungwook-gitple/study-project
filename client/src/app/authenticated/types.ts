export interface SignInResponse {
  message: string;
  token: string;
  userId: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
}
