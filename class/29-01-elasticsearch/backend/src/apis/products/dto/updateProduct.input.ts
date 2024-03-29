import { InputType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}

// OmitType(CreateProductInput, ['description']);
// PickType(CreateProductInput, ['name', 'price']);
