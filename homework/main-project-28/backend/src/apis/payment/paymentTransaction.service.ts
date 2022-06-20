import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Connection, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PaymentTransaction,
  PAYMENT_TRANSACTION_STATUS_ENUM,
} from './entities/paymentTransaction.entity';

@Injectable()
export class PaymentTransactionService {
  constructor(
    @InjectRepository(PaymentTransaction)
    private readonly paymentTransactionRepository: Repository<PaymentTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private connection: Connection,
  ) {}
  async create({ impUid, amount, currentUser }) {
    //1. PaymentTransaction 테이블에 거래기록 1줄 생성
    const paymentTransaction = this.paymentTransactionRepository.create({
      impUid: impUid,
      amount: amount,
      user: currentUser,
      status: PAYMENT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    await this.getToken(impUid, amount);
    const isAuth = await this.paymentTransactionRepository.findOne({ impUid });
    if (isAuth) {
      throw new ConflictException('이미 결재했어');
    }

    await this.paymentTransactionRepository.save(paymentTransaction);
    //2. 유저의 돈 찾아오기

    const user = await this.userRepository.findOne({ id: currentUser.id });
    //3. 유저의 돈 업데이트
    await this.userRepository.update(
      { id: user.id },
      { payment: user.payment + amount },
    );
    //4. 최종결과 프론트엔드에 돌려주기
    return paymentTransaction;
  }

  async cancel({ impUid, reason, cancelAmount, currentUser }) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    let paymentTransaction = null;

    try {
      // 기존 금액 조회
      const toBeCanceledPaymentTransaction =
        await this.paymentTransactionRepository.findOne({ impUid });

      // 취소금액을 집계합니다.
      let [amountSum] = await queryRunner.manager.query(`
      SELECT SUM(amount) amountSum FROM payment_transaction pt WHERE impUid = '${impUid}' AND  status ='${PAYMENT_TRANSACTION_STATUS_ENUM.CANCEL}'
    `);

      let canceledAmountSum = amountSum.amountSum
        ? Number(amountSum.amountSum)
        : 0;

      // 환불 가능 금액(= 결제금액 - 환불 된 총 금액) 계산
      const cancelableAmount =
        toBeCanceledPaymentTransaction.amount - canceledAmountSum;

      // 이미 취소된 결제라면 UnprocessableEntityException 에러를 반환해주세요.
      if (cancelableAmount <= 0) {
        // 이미 전액 환불된 경우
        throw new UnprocessableEntityException('이미 전액환불된 주문입니다.');
      }

      const accessToken = await this.getToken(impUid, cancelAmount);

      /* 아임포트 REST API로 결제환불 요청 */
      const getCancelData = await axios({
        url: 'https://api.iamport.kr/payments/cancel',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken, // 아임포트 서버로부터 발급받은 엑세스 토큰
        },
        data: {
          reason, // 가맹점 클라이언트로부터 받은 환불사유
          imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
          amount: cancelAmount, // 가맹점 클라이언트로부터 받은 환불금액
          checksum: cancelableAmount, // [권장] 환불 가능 금액 입력
        },
      });
      // 이미 취소되었을 경우 에러발생
      if (getCancelData.data.code == 1) {
        throw new UnprocessableEntityException('이미 전액환불된 주문입니다.');
      }

      //1. PaymentTransaction 테이블에 거래기록 1줄 생성
      paymentTransaction = this.paymentTransactionRepository.create({
        impUid: impUid,
        amount: -cancelAmount,
        user: currentUser,
        status: PAYMENT_TRANSACTION_STATUS_ENUM.CANCEL,
      });
      await this.paymentTransactionRepository.save(paymentTransaction);

      const { response } = getCancelData.data; // 환불 결과

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return paymentTransaction;
  }

  async getToken(impUid, amount) {
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: '6465959605337597', // REST API 키
        imp_secret:
          'c696bcebfbeda238ea3f46cb9e0e2aee4466c14c32f7dae8ba02dee12058769653647c2c1f3788f7', // REST API Secret
      },
    });
    const { access_token } = getToken.data.response;
    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${impUid}`, // imp_uid 전달
      method: 'get', // GET method
      headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
    });
    const paymentData = getPaymentData.data.response; // 조회한 결제 정보
    const { amount: qqq } = paymentData;
    if (amount !== qqq) {
      throw new UnprocessableEntityException('error');
    }

    return access_token;
  }
}
