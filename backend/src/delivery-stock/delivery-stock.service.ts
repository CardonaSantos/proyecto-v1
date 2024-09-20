import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateDeliveryStockDto } from './dto/update-delivery-stock.dto';
import { PrismaService } from 'src/prisma.service';
// import { CreateEntregaStockDto } from './dto/create-delivery-stock.dto';
import { CreateDeliveryStockDto } from './dto/create-delivery-stock.dto';

@Injectable()
export class DeliveryStockService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEntregaStockDto: CreateDeliveryStockDto) {
    console.log('hola');
  }

  findAll() {
    return `This action returns all deliveryStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryStock`;
  }

  update(id: number, updateDeliveryStockDto: UpdateDeliveryStockDto) {
    return `This action updates a #${id} deliveryStock`;
  }

  async removeAll() {
    try {
      const allDeliverys = await this.prisma.entregaStock.deleteMany({});
      return allDeliverys;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al eliminar todos los registros',
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryStock`;
  }
}
