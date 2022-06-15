import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { PaymentTransaction } from './entities/paymentTransaction.entity';
import { PaymentTransactionService } from './paymentTransaction.service';

@Resolver()
export class PaymentTransactionResolver {
  constructor(
    private readonly paymentTransactionService: PaymentTransactionService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PaymentTransaction)
  createPaymentTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.paymentTransactionService.create({
      impUid,
      amount,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PaymentTransaction)
  cancelPaymentTransaction(
    @Args('impUid') impUid: string,
    @Args('reason') reason: string,
    @Args('cancelAmount') cancelAmount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.paymentTransactionService.cancel({
      impUid,
      reason,
      cancelAmount,
      currentUser,
    });
  }
}
