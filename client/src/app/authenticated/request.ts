import { http } from 'src/http';
import { SignInResponse } from './types';

export async function requestSignIn(username: string, password: string) {
  const signInData = await http.post<SignInResponse>(
    '/signIn',
    {
      username,
      password
    }
  ).then(r => r.data)
    .catch (e => {});

  if (!signInData || !signInData.token) {
    console.error('token을 받지 못했습니다.');
    return;
  }

  return signInData;
}

export async function requestSignOut() {
  const result = await http.delete(
    '/signOut',
    {}
  ).then(r => r.data)
    .catch(e => {
      console.error(e);
      return {
        error: e,
        message: e.message
      }
    });

  return result;
}
