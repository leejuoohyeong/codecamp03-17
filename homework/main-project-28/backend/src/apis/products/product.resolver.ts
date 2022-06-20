import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import {Cache} from 'cache-manager'


@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
              
    private readonly elasticsearchService: ElasticsearchService,  
        
    @Inject(CACHE_MANAGER)
    private readonly cacheManager:Cache,
    ) {}
    @Query(() => [Product])
    

    async fetchProducts(
      @Args('search') search:string,//
    ) {
      //redis 조회
      const key = `product:${search}`;
      const check = await this.cacheManager.get(key);
      if (check){
        return check;
      }
      //엘라스틱서치에서 조회(검색)하기 연습!!
      const result = await this.elasticsearchService.search({
        index:"myproduct03_new",
        query: {
          match:{name:search},
        }
      })
      console.log(JSON.stringify(result,null, ' '))
  
      


      //mysql 검색
      const jwt = result.hits.hits.map((v) => v._source['id'])
      const koko = await this.productService.findredis(jwt)

      //redis 생성
      await this.cacheManager.set(key,koko, {ttl: 400})

      return koko
    }

  // @Query(() => [Product])
  // fetchProducts() {
  //   return this.productService.findAll();
  // }
  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create({ createProductInput });
  }
  // 위까지는 제품 생성

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매 완료가 되었는지 확인해보기
    await this.productService.checkSoldout({ productId });

    // 수정하기
    return await this.productService.update({ productId, updateProductInput });
  }

  //삭제하기
  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.delete({ productId });
  }
}
