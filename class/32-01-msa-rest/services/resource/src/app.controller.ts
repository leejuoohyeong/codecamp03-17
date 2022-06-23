import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/aaa')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @MessagePattern({ cmd: 'bbb' })
  fetchBoards() {
    return 'fetchBoards 게시글 데이터 보내주기';
  }
}
