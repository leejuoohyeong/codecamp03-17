import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  // @Get('/aaa')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Mutation(() => String)
  login() {
    return 'login 성공!!';
  }
}
