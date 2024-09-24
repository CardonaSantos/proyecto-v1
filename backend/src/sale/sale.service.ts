import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}

  async createSale(createSaleDto: CreateSaleDto) {
    console.log('los datos llegando son: ' + createSaleDto);
    console.log();

    try {
      // Inicia una transacción
      return await this.prisma.$transaction(async (prisma) => {
        // Verificar si hay stock para cada producto solicitado....
        for (const producto of createSaleDto.productos) {
          const productoEncontrado = await prisma.producto.findUnique({
            where: { id: producto.productoId },
          });

          if (!productoEncontrado) {
            throw new Error(
              `No se encontró el producto con ID: ${producto.productoId}`,
            );
          }

          const stockDeProducto = await prisma.stock.findUnique({
            where: { productoId: productoEncontrado.id },
          });

          //si no hay stock o es insuficiente
          if (
            !stockDeProducto ||
            stockDeProducto.cantidad < producto.cantidad
          ) {
            throw new Error(
              `Stock insuficiente para el producto con ID: ${productoEncontrado.id}`,
            );
          }
        }

        // Crear la venta y los productos relacionados
        const newSale = await prisma.venta.create({
          data: {
            citaId: createSaleDto.citaId,
            clienteId: createSaleDto.clienteId,
            usuarioId: createSaleDto.vendedorId,
            descuento: createSaleDto.descuento || null, //nuevo para meter el descuento
            metodoPago: createSaleDto.metodoPago, //ENUM
            monto: createSaleDto.monto, //CAMPO PARA LA VENTA EN TOTAL SIN APLICAR EL DESUENTO
            montoConDescuento: createSaleDto.montoConDescuento, //VENTA TOTAL APLICANDO EL DESCUENTO
            productos: {
              create: createSaleDto.productos.map((prod) => ({
                producto: { connect: { id: prod.productoId } },
                cantidad: prod.cantidad,
                precio: prod.precio,
              })),
            },
          },
          include: {
            productos: {
              include: { producto: true }, // incluir detalles del producto
            },
          },
        });

        // Actualizar el stock
        for (const producto of createSaleDto.productos) {
          await prisma.stock.update({
            where: { productoId: producto.productoId },
            data: {
              cantidad: {
                decrement: producto.cantidad,
              },
            },
          });
        }
        console.log('La venta hecha es: ', newSale);

        return newSale;
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear la venta: ' + error.message);
    }
  }

  async findAll() {
    try {
      const saleRegist = await this.prisma.venta.findMany({
        include: {
          cita: true,
          cliente: true,
          productos: { include: { producto: true } },
          vendedor: true,
        },
      });
      console.log('servicio de venta recuperacion');

      return saleRegist;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('No se encontraron registros de ventas');
    }
  }

  async findOne(id: number) {
    try {
      const saleRegist = await this.prisma.venta.findUnique({
        where: { id },
      });
      return saleRegist;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('No se encontraron registros de ventas');
    }
  }

  async remove(id: number) {
    try {
      const saleRegist = await this.prisma.venta.delete({
        where: { id },
      });
      return saleRegist;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('No se encontraron registros de ventas');
    }
  }

  async removeAllRegist2() {
    try {
      const saleRegist = await this.prisma.venta.deleteMany({});
      return saleRegist;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('No se encontraron registros de ventas');
    }
  }
}
