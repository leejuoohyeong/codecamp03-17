import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

// 가짜 유저 만들기
class MockUserRepository {
  // 이미 등록된 메일 에러를 발생시키기 위해 가짜 데이터를 만들어줍니다.
  mydb = [{ email: 'a@a.com', password: '0000', name: '짱구', age: 8 }];

  findOne({ email }) {
    //위에서 만든 가짜 데이터로 에러를 발생시키기 위해 사용
    const users = this.mydb.filter((el) => el.email === email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    //받아온 회원정보를
    this.mydb.push({ email, password, name, age }); //mydb에 푸쉬
    return { email, password, name, age };
  }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let userService: UserService; //아래 userService 를 모든곳에서 사용하기 위해 선언
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository, //가짜 유저 사용하기
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService); // 위에 선언한 userService 의 값을 지정
    userRepository = userModule.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
  });
  describe('create', () => {
    it('이미 존재하는 이메일 검증하가!!', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne'); //findOne이 몇번 실행되는지 확인
      const userRepositorySpySave = jest.spyOn(userRepository, 'save'); // save가 몇번 실행되는지 확인

      //DB에 접속해서 검증 하지 않기 위해 가짜 DB를 만들어 줍니다.
      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };
      try {
        // 만들어준 가짜 DB를 사용 해줍니다.
        await userService.create({ ...myData });
      } catch (error) {
        // 우리가 예상한 에러가 맞는지 확인
        expect(error).toBeInstanceOf(ConflictException);
      }
      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(0);
    });

    it('회원 등록 잘됐는지 검증!!', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne'); //findOne이 몇번 실행되는지 확인
      const userRepositorySpySave = jest.spyOn(userRepository, 'save'); // save가 몇번 실행되는지 확인

      const myData = {
        email: 'bbb@bbb.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };

      // 실제 환경에서 보이는 데이터
      const myResultData = {
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 13,
      };

      const result = await userService.create({ ...myData });
      //등록이 성공되면 실제 환경에서 보이는 myResultData를 보내줍니다.
      //hashedPassword가 보이는게 아니라 Password가 보이기때문에
      // 객체는 toBe가 아닌 toStrictEqual로 비교 합니다
      expect(result).toStrictEqual(myResultData);
      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {});
});
