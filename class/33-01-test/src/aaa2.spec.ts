import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  // 1. 전체에서 사용하기 위헤 선언해주는곳
  let appController: AppController;
  let appService: AppService;

  // 2. 선언해준 객체가 무엇인지 정해주는곳
  beforeEach(() => {
    appService = new AppService(); // 컨트롤레에 서비스를 넣어주기 위해 선언
    appController = new AppController(appService); //컨트롤러 안에 서비스까지 직접 넣어줘야 작동합니다.
  });

  // 3. 선언 해준 객체들을 직접적으로 사용해주는곳
  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });
  });
});
