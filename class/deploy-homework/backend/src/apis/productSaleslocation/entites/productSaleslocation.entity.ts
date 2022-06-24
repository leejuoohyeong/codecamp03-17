import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//상품거래 위치
@Entity() //테이블로 만들어주는 명령어
@ObjectType()
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => Float)
  lat: number;

  @Column()
  @Field(() => Float)
  lng: number;

  @Column()
  @Field(() => Date)
  meetingTime: Date;
}
