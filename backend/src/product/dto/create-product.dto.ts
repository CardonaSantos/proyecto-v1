import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  descripcion?: string; // Opcional

  @IsNumber()
  @IsNotEmpty()
  precio: number; // Precio de venta

  @IsString()
  @IsNotEmpty()
  codigoProducto: string;

  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true }) // Cada ID debe ser un número
  categoriaIds: number[]; // Array de IDs de categorías
}
