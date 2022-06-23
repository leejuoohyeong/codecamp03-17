import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';

interface IOAuthUser {
  user: Pick<User, "email" | "password" | "name" | "age">   // 아니면 OmitType 써서 다른 것들을 빼주기
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,  //
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google')) // graphql아니라 UseGuards() 안에 바로 AuthGuard 넣어주면 됨. google strategy 만들어줘야 함.
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response
  ) {
    // 1. 가입확인
    let user = await this.userService.findOne({email: req.user.email});
    
    // 2. 회원가입
    if (!user) {
      await this.userService.create({
        email: req.user.email,
        hashedPassword: req.user.password,    // 의미없는 값 (소셜로그인에선 비밀번호가 없기 때문)
        name: req.user.name,
        age: req.user.age
      });
    }

    // 3. 로그인 (구글 말고 우리 자체 accessToken 발급 등 "우리의" 로그인 절차)
    this.authService.setRefreshToken({user, res});

    res.redirect("http://localhost:5500/class/21-03-login-google/frontend/social-login.html");
  }
}
