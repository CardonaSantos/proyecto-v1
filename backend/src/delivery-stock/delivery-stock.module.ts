import { Module } from '@nestjs/common';
import { DeliveryStockService } from './delivery-stock.service';
import { DeliveryStockController } from './delivery-stock.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DeliveryStockController],
  providers: [DeliveryStockService, PrismaService],
})
export class DeliveryStockModule {}
