import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  async addStock(createStockDto: CreateStockDto) {
    console.log('Creando stock....');

    const { productos, proveedorId } = createStockDto;
    console.log('Los datos recibidos son: ', proveedorId, productos);

    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Crear el registro de entrega de stock
        const entrega = await prisma.entregaStock.create({
          data: {
            proveedorId,
            productos: {
              create: productos.map(
                ({ productoId, cantidad, costoUnitario }) => ({
                  productoId,
                  cantidad,
                  costoUnitario,
                }),
              ),
            },
          },
        });

        // Actualizar el stock de cada producto
        for (const { productoId, cantidad, costoUnitario } of productos) {
          const existingStock = await prisma.stock.findUnique({
            where: { productoId },
          });

          if (existingStock) {
            // Si ya existe el stock, actualizamos
            await prisma.stock.update({
              where: { productoId },
              data: {
                cantidad: {
                  increment: cantidad,
                },
                costoTotal: {
                  increment: cantidad * costoUnitario,
                },
              },
            });
          } else {
            // Si no existe, creamos el stock inicial
            await prisma.stock.create({
              data: {
                productoId,
                cantidad,
                proveedorId,
                costoTotal: cantidad * costoUnitario,
              },
            });
          }
        }

        return entrega;
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al añadir stock');
    }
  }

  async findAll() {
    try {
      const stock = await this.prisma.stock.findMany({
        include: {
          producto: true,
          proveedor: true,
        },
      });
      return stock;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error encontrar registros de stock');
    }
  }

  async findOne(id: number) {
    try {
      const stock = await this.prisma.stock.findUnique({
        where: { id },
      });
      return stock;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error encontrar registros de stock');
    }
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    try {
      const stock = await this.prisma.stock.update({
        where: { id },
        data: updateStockDto,
      });
      return stock;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error encontrar registros de stock');
    }
  }

  async remove(id: number) {
    try {
      const stock = await this.prisma.stock.delete({
        where: { id },
      });
      return stock;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error eliminar registros de stock',
      );
    }
  }

  async removeAllStock() {
    try {
      const stockToDelete = await this.prisma.stock.deleteMany({});
      return stockToDelete;
    } catch (error) {
      console.log(error);
      throw new NotAcceptableException('No se encontraron registros');
    }
  }
}
