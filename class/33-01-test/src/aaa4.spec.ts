import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockAppService {
  getHello() {
    return 'Hello World!';
  }
}

describe('AppController', () => {
  // 1. 전체에서 사용하기 위헤 선언해주는곳
  let appController: AppController;

  // 2. 선언해준 객체가 무엇인지 정해주는곳
  beforeEach(async () => {
    //여기 파일에 app.module.ts 기능을 사용할 수 있게 만들어주는것
    // 만들어주는 이유는 테스트 실행시 app.module을 못불러오기때문
    // 앱 모듈 만들어주는것은 시간이 걸려서 await를 사용해 줍니다.
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService, // 나만의 AppService 주입하기
        },
      ],
    }).compile();

    //aaa2에서 직접 해주던 방식을 aaa3에서는 app.module을 불러오는 식으로 디펜던시 인젝션 하게 만들어주는것
    appController = app.get<AppController>(AppController);
  });

  // 3. 선언 해준 객체들을 직접적으로 사용해주는곳
  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함', () => {
      // const result = appController.getHello();
      // expect(result).toBe('Hello World!');

      // 위에 주석처리한 두줄과 같은 기능
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
