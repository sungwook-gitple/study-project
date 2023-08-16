import { Result } from '@/src/common/constants';
import { createAuthenticationToken } from '@/src/components/auth/auth.service';
import { User, UserModel } from '@/src/db/model/user';

class AuthenticateService {
  private userModel: typeof UserModel;

  constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  async authenticate(username: string, password: string): Promise<{
    token: string, user: User
  } | {
    error: {
      code?: string,
      message?: string,
    }
  }> {
    const result = await this.userModel.find({
      username,
      password,
    });

    if (result.length === 0) {
      return {
        error: {
          message: '아이디 또는 비밀번호가 일치하지 않습니다.'
        }
      }
    }

    if (result.length > 1) {
      console.error('회원 정보에 문제가 있습니다.');
      return {
        error: {
          code: '01',
          message: '회원 정보에 문제가 있습니다.'
        }
      }
    }

    const user = result[0];
    const token = createAuthenticationToken({
      name: user.name,
      username: user.username
    });

    return {
      user,
      token,
    }
  }
}

export { AuthenticateService };
