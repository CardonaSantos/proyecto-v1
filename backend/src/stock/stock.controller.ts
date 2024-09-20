import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  async create(@Body() createStockDto: CreateStockDto) {
    return await this.stockService.addStock(createStockDto);
  }

  @Get()
  async findAll() {
    return await this.stockService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.stockService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return await this.stockService.update(+id, updateStockDto);
  }

  @Delete('/delete-all')
  async removeAll() {
    return await this.stockService.removeAllStock();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.stockService.remove(+id);
  }
}
