import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from './create-attendance.dto';
import { IsDate, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  salida?: Date;
}
