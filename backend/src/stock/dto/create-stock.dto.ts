import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Producto {
  @IsNumber()
  @IsNotEmpty()
  productoId: number; // ID del producto

  @IsNumber()
  @IsNotEmpty()
  cantidad: number; // Cantidad de producto que se va a añadir al stock

  @IsNumber()
  @IsNotEmpty()
  costoUnitario: number; // Costo unitario de cada producto en esta entrega
}

export class CreateStockDto {
  @IsArray()
  @ValidateNested({ each: true }) // Valida cada objeto en el array
  @Type(() => Producto) // Indica que los objetos son del tipo Producto
  @IsNotEmpty()
  productos: Producto[]; // Array de productos

  @IsNumber()
  @IsNotEmpty()
  proveedorId: number; // ID del proveedor
}
