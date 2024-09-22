import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const { nombre, descripcion, precio, categoriaIds, codigoProducto } =
      createProductDto;

    let precioInt = Number(precio);

    try {
      const product = await this.prisma.producto.create({
        data: {
          nombre,
          descripcion,
          precio: precioInt,
          codigoProducto,
          categorias: {
            create: categoriaIds.map((categoriaId) => ({
              categoria: { connect: { id: categoriaId } },
            })),
          },
        },
        include: {
          categorias: true,
        },
      });

      console.log('Producto creado: ', product);

      return product;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al crear producto');
    }
  }

  async findAllProducts() {
    try {
      const product = await this.prisma.producto.findMany({
        include: {
          stock: true,
          ventas: true,
          entregas: true,
          categorias: {
            select: {
              categoria: true,
            },
          },
        },
      });
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear producto');
    }
  }

  async findOneProduct(id: number) {
    try {
      const product = await this.prisma.producto.findUnique({
        where: { id },
      });
      return product;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error al encontrar producto');
    }
  }

  async updateOneProduct(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.prisma.producto.update({
        where: { id },
        data: updateProductDto,
      });
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al actualizar producto');
    }
  }

  async removeOneProduct(id: number) {
    try {
      const product = await this.prisma.producto.delete({
        where: { id },
      });
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar producto');
    }
  }
  async removeAllProducts() {
    try {
      const products = await this.prisma.producto.deleteMany({});
      return products; // Esto devuelve la cantidad de productos eliminados
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar productos');
    }
  }
}
