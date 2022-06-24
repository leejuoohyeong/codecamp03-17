import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { resourceLimits } from 'worker_threads';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService,
              private readonly elasticsearchService: ElasticsearchService,  
    ) {}

  @Query(() => [Product])
  async fetchProducts() {
    //엘라스틱서치에서 조회하기 연습!!
    const result = await this.elasticsearchService.search({
      index:"myproduct03_new",
      query: {
        match_all:{},
      }
    })
    console.log(JSON.stringify(result,null, ' '))

    // return this.productService.findAll();
  }
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
    // //엘라스틱서치에 등록하기 연습!!(연습이후 삭제)
    
    // this.elasticsearchService.create({
    //   id: "myid",
    //   index:"myproduct03",
    //   document: {
    //     // name:"철수",
    //     // age:13,
    //     // school: "다람쥐초등학교"
    //     ...createProductInput,
    //   }
    // })


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

