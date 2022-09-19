import { AxiosError } from "axios";
import { http } from "src/http";
import { SignUpRequest } from "./type";

export function requestSignUp(user: SignUpRequest) {
  return http.post('/signUp', user)
    .then(r => r.data)
    .catch((e: AxiosError) => {
      console.error(e.response.data);
      console.error(e.message);
      const data = e.response.data as any;

      return {
        result: 'fail',
        message: data.message || e.message,
        data: e,
      };
    });
}