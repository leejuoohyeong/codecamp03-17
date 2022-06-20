import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productSaleslocation/entites/productSaleslocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { Image } from '../Image/entities/Image.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,

    //아래 크리에이트 부분에 프로덕트 태그 를 사용하기 위해 선행으로 불러오는 부분(const tagname)
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}
//redis 조회
async findredis(jwt) {
  return await this.productRepository.findByIds(jwt,
    {relations: ['productSaleslocation', 'productCategory', 'productTags']})
  
}





  //findAll, findone은 조회하는 부분
  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags','productId'],
    });
  }

  async create({ createProductInput }) {
    // 1. 기존방식 (상품만 등록하는 경우)
    // const result = await this.productRepository.save({
    //   ...createProductInput,

    //   // 하나하나 직접 나열하는 방식
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    // productCategoryId도 분리
    // 프로덕트 리졸버 안에서 크리에이트 프로덕트 안에 프로덕트 태그즈를 추가한후 아래의 중괄호에 추가
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    //상품상세주소테이블 입력
    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    // 선언해주는곳productTags // ["#전자제품", "#영등포", "#컴퓨터"]
    // for문은 #을 제거해주기 위해 사용
    const result2 = []; // [{name:..., id:...}, {name:..., id:...}, {name:..., id:...}]
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', ''); //위의 샵을 지움

      // 이미 등록된 태그인지 확인해보기
      const prevTag = await this.productTagRepository.findOne({
        name: tagname,
      });

      // 기존에 태그가 존재한다면
      if (prevTag) {
        result2.push(prevTag);

        // 기존에 태그가 없었다면
      } else {
        const newTag = await this.productTagRepository.save({ name: tagname });
        result2.push(newTag); //빈배열 result2 에 만든 newTag를 넣기
      }
      //이런 방식은 가능은 하나 비효율적 이기때문에 다른 방식을 사용할 예정
    }

    // 상품테이블
    const createdProduct = await this.productRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 넣기
      //productCategoryId 분리 한것 출력
      productCategory: { id: productCategoryId }, // 여기 있는것은 내부에 ID값이 들어가있어야 사용가능하다
      // 사용해주는곳 productTags // ["#전자제품", "#영등포", "#컴퓨터"]
      productTags: result2, //위에서 완성시킨 result2 를 불러오기
    });

    //****iron START */
    // url들을 이미지들에 저장합니다.
    for (const url of createProductInput.urls) {
      const image = this.imageRepository.create({
        url: 'https://storage.googleapis.com/' + url,
        product: createdProduct,
      });

      await this.imageRepository.save(image);
    }
    //****iron END */

    return createdProduct;
  }

  async update({ productId, updateProductInput }) {
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const newProduct = {
      ...myproduct,
      id: productId,
      ...updateProductInput,
    };

    //****iron START */
    // 트랜잭션 필요해보임
    // 1. 클라이언트에서 상품의 id와 해당하는 상품에 들어갈 모든 이미지 url 목록을 보내줍니다.
    const toRemoveProducts = await this.imageRepository.find({
      where: {
        product: {
          id: productId,
        },
      },
    });
    // 2. 이미지 테이블에서 상품 id가 일치하는 데이터를 모두 삭제합니다.
    await this.imageRepository.remove(toRemoveProducts);

    // 3. 새로운 이미지 url을 가지고 데이터를 생성합니다.
    for (const url of updateProductInput.urls) {
      const image = this.imageRepository.create({
        url: 'https://storage.googleapis.com/' + url,
        product: newProduct,
      });

      await this.imageRepository.save(image);
    }
    //****iron END */

    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }) {
    //1. 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // // 삭젝가 되었는지 알려주는
    // result.affected ? true : false;

    // //2. 소프트 삭제(직접구현) - isDeleted
    // this.productRepository.update({ id: productId }, { isDeleted: true });
    //수정이 되고 수정정보를 불러온다

    // //3. 소프트 삭제(직접구현) - deletedAt
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // //4. 소프트 삭제(typORM 제공)
    // this.productRepository.softRemove({ id: productId }); // id로만 삭제 가능

    //5, 소프트 삭제(TyprORM 제공) - softDelete
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
