import { PartialType } from '@nestjs/mapped-types';
import { CreateDateDto } from './create-date.dto';

export class UpdateDateDto extends PartialType(CreateDateDto) {}
