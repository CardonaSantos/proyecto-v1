import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const newCustomer = await this.prisma.cliente.create({
        data: createCustomerDto,
      });
      return newCustomer;
    } catch (error) {
      // Manejo de errores
      console.log(error);

      throw new BadRequestException('Error el crear cliente');
    }
  }

  async findAllCustomers() {
    try {
      const customers = await this.prisma.cliente.findMany({
        include: {
          ventas: true,
        },
      });
      return customers;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('No se encontraron clientes');
    }
  }

  async findOneCustomer(id: number) {
    try {
      const oneCustomer = await this.prisma.cliente.findUnique({
        where: {
          id: id,
        },
      });
      return oneCustomer;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Cliente no encontrado');
    }
  }

  async findOneCustomersWithDiscount() {
    try {
      const oneCustomer = await this.prisma.cliente.findMany({
        include: {
          descuentos: true,
        },
      });
      return oneCustomer;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Cliente no encontrado');
    }
  }

  async updateOneCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.prisma.cliente.update({
        where: { id: id },
        data: updateCustomerDto,
      });
      return customer;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al actualizar cliente');
    }
  }

  async removeOneCustomer(id: number) {
    try {
      const customer = await this.prisma.cliente.delete({
        where: { id },
      });
      return customer;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('No se pudo eliminar el cliente');
    }
  }

  async removeAllCustomers() {
    try {
      const customers = await this.prisma.cliente.deleteMany({});
      return customers;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('No se pudo eliminar el cliente');
    }
  }
}
