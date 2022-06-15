import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PaymentTransaction } from './entities/paymentTransaction.entity';
import { PaymentTransactionResolver } from './paymentransaction.resolver';
import { PaymentTransactionService } from './paymentTransaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentTransaction, //
      User,
    ]),
  ],
  providers: [
    PaymentTransactionResolver, //
    PaymentTransactionService,
  ],
})
export class PaymentTransactionModule {}
