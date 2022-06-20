import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../Image/entities/Image.entity';
import { ProductSaleslocation } from '../productSaleslocation/entites/productSaleslocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import {ElasticsearchModule} from '@nestjs/elasticsearch'


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductSaleslocation,
      ProductTag,
      Image,
    ]),
    ElasticsearchModule.register({
      node:"http://elasticsearch:9200",
    })
  ],
  providers: [
    ProductResolver, //
    ProductService,

  ],
})
export class ProductModule {}
