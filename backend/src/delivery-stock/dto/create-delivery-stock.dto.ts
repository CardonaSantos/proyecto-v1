import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDeliveryStockDto {
  @IsNumber()
  @IsNotEmpty()
  proveedorId: number; // ID del proveedor

  @IsArray()
  @IsNotEmpty()
  productos: Array<{
    productoId: number; // ID del producto
    cantidad: number; // Cantidad entregada
    costoUnitario: number; // Costo por unidad del producto
  }>;
}
