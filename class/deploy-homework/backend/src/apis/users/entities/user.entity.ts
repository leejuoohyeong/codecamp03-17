import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //테이블로 만들어주는 명령어
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) // 비밀번호 노출 금지!!
  password: string;

  @Column() //데이터베이스에 들어가게끔
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;
}
