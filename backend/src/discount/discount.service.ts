import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DiscountService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDiscountDto: CreateDiscountDto) {
    try {
      const newDiscount = await this.prisma.descuento.create({
        data: createDiscountDto,
      });
      return newDiscount;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all discount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
