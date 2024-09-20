import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  codigoProducto: string;

  @IsNumber()
  @IsNotEmpty()
  precio: number;
}
