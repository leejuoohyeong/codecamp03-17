import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entites/productSaleslocation.entity';
import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//상품
@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string; //타입스크립트의 타입 //PK

  @Column() //MySQL에 들어가는 타입
  @Field(() => String)
  name: string; //타입스크립트의 타입 //상품명

  @Column()
  @Field(() => String)
  description: string; //타입스크립트의 타입 //상품내용

  @Column()
  @Field(() => Int)
  price: number; //타입스크립트의 타입 //상품가격

  @UpdateDateColumn()
  updatedAt:Date

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean; //타입스크립트의 타입 //상품 판매여부

  @DeleteDateColumn()
  deletedAt: Date; //삭제 기능

  @JoinColumn() //one to one관계로 연결해 주려면 넣어줘야합니다.
  @OneToOne(() => ProductSaleslocation) //ProductSaleslocation과의 1:1 관계 //FK
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory) //ProductCategory과의 many:1 관계 //FK
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;


  @JoinTable() //다대다일때 둘줄 아무곳에 입력해주는 것이고 중간테이블을 생성 시키는 명령어입니다.
  @ManyToMany(() => ProductTag, (ProductTags) => ProductTags.products) //다대 다는 반대의 입장도 써줘야합니다.
  @Field(() => [ProductTag])
  productTags: ProductTag[]; //다대다의 안의 태그들이기 때문에 []배열이 들어가게 됩니다.
}
