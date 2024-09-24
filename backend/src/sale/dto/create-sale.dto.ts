import {
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { MetodoPago } from '@prisma/client';

class ProductSaleDto {
  @IsInt()
  productoId: number;

  @IsString()
  codigoProducto: string;

  @IsInt()
  cantidad: number;

  @IsPositive()
  precio: number; // Precio unitario para este producto en esta venta
}

export class CreateSaleDto {
  @IsInt()
  clienteId: number;

  @IsInt()
  vendedorId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSaleDto)
  productos: ProductSaleDto[];

  @IsNumber()
  descuento: number;

  @IsPositive()
  monto: number;

  @IsOptional()
  @IsInt()
  citaId?: number; // Opcional si está asociado a una cita

  @IsNotEmpty()
  @IsEnum(MetodoPago) // Enum validado
  metodoPago: MetodoPago;

  @IsPositive()
  @IsNotEmpty()
  montoConDescuento: number;
}
