import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entites/productSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}

// @Column()
//   @Field(() => String)
//   address: string;

//   @Column()
//   @Field(() => String)
//   addressDetail: string;

//   @Column()
//   @Field(() => Float)
//   lat: number;

//   @Column()
//   @Field(() => Float)
//   lng: number;

//   @Column()
//   @Field(() => Date)
//   meetingTime: Date;
