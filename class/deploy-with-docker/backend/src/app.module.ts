import { Module } from '@nestjs/common';
import { BoardModule } from './apis/boards/board.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
// import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { PaymentMoudle } from './apis/payment/payment.module';
import { FileModule } from './apis/file/file.module';

@Module({
  imports: [
    FileModule,
    AuthModule,
    BoardModule,
    PaymentMoudle,
    // PointTransactionModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.25.48.4', //비공개 ip
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'myserver03',
      entities: [__dirname + '/apis/**/*.entity.*'], //apis폴더의 모든 파일 들중 .entitiy.ts로  끝나는 모든것을 가져옵니다
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
