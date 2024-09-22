import { IsNotEmpty, IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  porcentaje: number; // Porcentaje del descuento

  @IsNotEmpty()
  @IsInt()
  usuarioId: number; // ID del vendedor que solicita el descuento

  @IsNotEmpty()
  @IsInt()
  clienteId: number; // ID del cliente al que se aplica el descuento
}
