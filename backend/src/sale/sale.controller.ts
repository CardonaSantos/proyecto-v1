import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    return await this.saleService.createSale(createSaleDto);
  }

  @Get()
  async findAll() {
    return await this.saleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.saleService.findOne(+id);
  }

  @Delete('/delete-all')
  // @HttpCode(204)
  async removeAllRegist() {
    console.log('Entrando a borrar todos los registros');

    return await this.saleService.removeAllRegist2();
  }

  @Delete(':id')
  async removeOneRegist(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException(
        'El ID proporcionado no es un número válido',
      );
    }
    return await this.saleService.remove(parsedId);
  }
}
