import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryStockDto } from './create-delivery-stock.dto';

export class UpdateDeliveryStockDto extends PartialType(CreateDeliveryStockDto) {}
