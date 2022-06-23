import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

// 'myGuard' is from user.resolver.ts -- see fetchUser()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      //   jwtFromRequest: (req) => {
      //     return req.headers.Authorization.replace('Bearer ', '');
      //   },
      // 위와 동일
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
    });
  }

  // 위에꺼가 통과하면 validate() 실행
  validate(payload) {
    console.log(payload); // email: a@aaa.com, sub (uuid): qoweirjodfj-12430194
    return {
        email: payload.email,
        id: payload.sub
    };
  }
}
