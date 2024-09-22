import { IsDate, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAttendanceDto {
  @IsInt()
  usuarioId: number;

  @IsDate()
  @Type(() => Date)
  fecha: Date; // Campo para la fecha específica

  @IsDate()
  @Type(() => Date)
  entrada: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  salida?: Date;
}
