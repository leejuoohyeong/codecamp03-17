import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

// 'myGuard' is from user.resolver.ts -- see fetchUser()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        // console.log(cookie);
        return refreshToken;
      },
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
    });
  }

  // 위에꺼가 통과하면 validate() 실행
  validate(payload) {
    console.log(payload); // email: a@aaa.com, sub (uuid): qoweirjodfj-12430194
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
