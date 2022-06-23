import { CacheModule, Module } from '@nestjs/common';
import { BoardModule } from './apis/boards/board.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { PaymentMoudle } from './apis/payment/payment.module';
import { FileModule } from './apis/file/file.module';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis'





@Module({
  imports: [
    FileModule,
    AuthModule,
    BoardModule,
    PaymentMoudle,
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
      host: 'my-database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydocker03',
      entities: [__dirname + '/apis/**/*.entity.*'], //apis폴더의 모든 파일 들중 .entitiy.ts로  끝나는 모든것을 가져옵니다
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url:'redis://my-redis:6379',
      isGlobal:true,
    }),
  ],
})
export class AppModule {}
