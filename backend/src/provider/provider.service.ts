import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProviderService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProviderDto: CreateProviderDto) {
    try {
      const newProvder = await this.prisma.proveedor.create({
        data: createProviderDto,
      });
      return newProvder;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error el crear proveedor');
    }
  }

  async findAll() {
    try {
      const providers = await this.prisma.proveedor.findMany({});
      return providers;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error el encontrar proveedores');
    }
  }

  async findOne(id: number) {
    try {
      const provider = await this.prisma.proveedor.findUnique({
        where: { id },
      });
      return provider;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error el encontrar proveedor');
    }
  }

  async update(id: number, updateProviderDto: UpdateProviderDto) {
    try {
      const provider = await this.prisma.proveedor.update({
        where: { id },
        data: updateProviderDto,
      });
      return provider;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error el actualizar proveedor');
    }
  }

  async removeAll() {
    try {
      const providersToDelete = await this.prisma.proveedor.deleteMany({});
      return providersToDelete;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error el eliminar proveedores');
    }
  }

  async remove(id: number) {
    try {
      const providerToDelete = await this.prisma.proveedor.delete({
        where: { id },
      });
      return providerToDelete;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error el eliminar proveedor');
    }
  }
}
