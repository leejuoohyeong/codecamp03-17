import { UnauthorizedException, UnprocessableEntityException, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "../users/user.service";
import * as bcrypt from "bcrypt";
import { AuthService } from "./auth.service";
import { GqlAuthAccessGuard, GqlAuthRefreshGuard } from "src/commons/auth/gql-auth.guard";
import { CurrentUser } from "src/commons/auth/gql-user.param";
import { IPayload } from "src/commons/interface/IPayload";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Resolver()
export class AuthResolver {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
        private readonly userService: UserService,  //
        private readonly authService: AuthService
    ) {}

    @Mutation(() => String)
    async login(
        @Args("email") email: string,   //
        @Args("password") password: string,
        @Context() context: any
    ) {
        
        // 1. 로그인(이메일과 비밀번호가 일치하는 유저를 DB에서 찾기)
        const user = await this.userService.findOne({email});

        // 2. 일치하는 유저가 없으면?! 에러 던지기!!!
        if (!user) throw new UnprocessableEntityException("이메일이 없습니다.");

        // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?! 에러 던지기!!!
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) throw new UnprocessableEntityException("암호가 틀렸습니다.");

        // 4. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
        context.res;
        this.authService.setRefreshToken({user, res: context.req.res});

        // 5. 일치하는 유저가 있으면?! accessToken(=JWT)을 만들어서 브라우저에 전달하기
        return this.authService.getAccessToken({user});
    }

    @Mutation(() => String)
    async logout(@Context() context:any,
    ){
        const accessToken = context.req.headers.authorization.replace(
            'Bearer ',
            '',
        );
        const refreshToken = context.req.headers.cookie.replace(
            'refreshToken=',
            '',
        )
        try {
            jwt.verify(accessToken, 'myAccessKey');
            jwt.verify(refreshToken, 'myRefreshKey');
          } catch {
            throw new UnauthorizedException();
          }
          await this.cacheManager.set(`accessToken:${accessToken}`,'accessToken', {
            ttl:60,
          });
          await this.cacheManager.set(`refreshToken:${refreshToken}`,'refreshToken', {
            ttl:60,
        });
        return '로그아웃에 성공했습니다'
    }
    

    
    // @UseGuards(GqlAuthAccessGuard)
    // @Mutation(() => String)
    // async logout(
    //     @CurrentUser() currentUser: IPayload,
    // ) {

    //     // console.log(currentUser);

    //     // return "로그아웃 되었습니다 겟아웃 히어";
        
    //     // // 1. 로그인(이메일과 비밀번호가 일치하는 유저를 DB에서 찾기)
    //     const user = await this.userService.findOne({ email: currentUser.email});

    //     // // 2. 일치하는 유저가 없으면?! 에러 던지기!!!
    //     if (!user) throw new UnprocessableEntityException("이메일이 없습니다."); 

    //     // // 5. 일치하는 유저가 있으면?! accessToken(=JWT)을 만들어서 브라우저에 전달하기
    //     return this.authService.getAccessToken({user});
    // }
    // GqlAuthAccessGuard is imported from src/commons/auth/gql-auth.guard.ts
    @UseGuards(GqlAuthRefreshGuard)
    @Mutation(() => String)
    restoreAccessToken(
        @CurrentUser() currentUser: any,
    ) {
        return this.authService.getAccessToken({user: currentUser});
    }
}