import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Cache } from 'cache-manager';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
      passReqToCallback: true,
    });
  }

  validate(req, payload) {
    //access키 맞는지 검증 후
    //여기에 엑세스토큰이 로그 아웃 되었는지 확인 하는 것을 넣어주기
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    const is_main_token = this.cacheManager.get(`accessToken:${accessToken}`);

    if (is_main_token) throw new UnauthorizedException();

    console.log(payload); // email: c@c.com, sub: woiejfoiwf-12314sd
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}