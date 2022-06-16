import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../Image/entities/Image.entity';
import { ProductSaleslocation } from '../productSaleslocation/entites/productSaleslocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductSaleslocation,
      ProductTag,
      Image,
    ]),
  ],
  providers: [
    ProductResolver, //
    ProductService,

  ],
})
export class ProductModule {}
