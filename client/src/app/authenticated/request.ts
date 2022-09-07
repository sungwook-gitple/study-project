import { http } from 'src/http';
import { SignInResponse } from './types';

// console.log('=== ngOnInit', this.http.post)
// const req = await this.http.post('http://localhost:3000/signIn', {})
// console.log('== result', req)
// req.subscribe();
// console.log('== result2', req)

export async function requestSignIn() {
  const signInData = await http.post<SignInResponse>('/signIn', {
    username: 'swkim@gitplecorp.com',
    password: '1234'
  }).then(r => r.data)

  if (!signInData.token) {
    console.error('token을 받지 못했습니다.')
    return
  }
  
  return signInData
}