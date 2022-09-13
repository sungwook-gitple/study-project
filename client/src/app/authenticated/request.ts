import { http } from 'src/http';
import { SignInResponse } from './types';

// console.log('=== ngOnInit', this.http.post)
// const req = await this.http.post('http://localhost:3000/signIn', {})
// console.log('== result', req)
// req.subscribe();
// console.log('== result2', req)

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
