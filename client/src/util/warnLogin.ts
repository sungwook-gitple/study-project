import { StatusCodes } from 'http-status-codes';

export function warnLogin(statusCode: number) {
  
  if (statusCode === StatusCodes.UNAUTHORIZED) {
    alert('로그인이 필요합니다.')
  }
}