import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeliveryStockService } from './delivery-stock.service';
// import { CreateDeliveryStockDto } from './dto/create-delivery-stock.dto';
import { CreateDeliveryStockDto } from './dto/create-delivery-stock.dto';
import { UpdateDeliveryStockDto } from './dto/update-delivery-stock.dto';

@Controller('delivery-stock')
export class DeliveryStockController {
  constructor(private readonly deliveryStockService: DeliveryStockService) {}

  @Post()
  async create(@Body() createDeliveryStockDto: CreateDeliveryStockDto) {
    return await this.deliveryStockService.create(createDeliveryStockDto);
  }

  @Get()
  findAll() {
    return this.deliveryStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryStockService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryStockDto: UpdateDeliveryStockDto,
  ) {
    return this.deliveryStockService.update(+id, updateDeliveryStockDto);
  }

  @Delete('/delete-all')
  removeAll(@Param('id') id: string) {
    return this.deliveryStockService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryStockService.remove(+id);
  }
}
