import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFillter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus(); //에러가 발생한 상태코드를 불러옴
    const message = exception.message;

    console.log('============================'); // 에러 메세지 출력
    console.log('예외가 발생했어요!!');
    console.log('예외내용:', message);
    console.log('예외코드:', status);
    console.log('============================');
  }
}
