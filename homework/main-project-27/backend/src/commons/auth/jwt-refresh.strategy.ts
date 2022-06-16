import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      //인가에 성공하면 아래의 validate가 작동합니다.
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        if (cookie) return cookie.replace('refreshToken=', '');
      },
      secretOrKey: 'myRefreshKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    const refreshToken = await req.headers.authorization.replace(
      'refreshToken=',
      '',
    );
    const is_refreshToken = await this.cacheManager.get(
      `refreshToken:${refreshToken},
    `);

    if (is_refreshToken) throw new UnauthorizedException();

    console.log(payload); // email: c@c.com, sub: woiejfoiwf-12314sd
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}



