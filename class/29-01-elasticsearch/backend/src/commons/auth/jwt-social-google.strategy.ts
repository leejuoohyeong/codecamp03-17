import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt } from 'passport-jwt';   // 여기선 안 함 (JWT)
import { Strategy } from 'passport-google-oauth20';

// 'myGuard' is from user.resolver.ts -- see fetchUser()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientId: "",                   // 구글에서 설정 후 발급 받음
      clientSecret: "",     // 비밀번호 // 구글에서 설정 후 발급 받음
      callbackURL: "",
      scope: ["email", "profile"],
    });
  }

  // 위에꺼가 통과하면 validate() 실행
  validate(accessToken, refreshToken, profile) {
    // req.user
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return {
      email: profile.emails[0].value,
      password: "sdf4asd65gf4as5d6g",     // 임의
      name: profile.displayName,
      age: 0
    };
  }
}
