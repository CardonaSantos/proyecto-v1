import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.prisma.categoria.create({
        data: createCategoryDto,
      });
      return newCategory;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear categoria');
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.categoria.findMany({
        include: { productos: true },
      });
      return categories;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al encontrar las categoria',
      );
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.categoria.findUnique({
        where: { id },
      });
      return category;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al encontrar categoria');
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.prisma.categoria.update({
        where: { id },
        data: updateCategoryDto,
      });
      return category;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al actualizar categoria');
    }
  }

  async removeAllCategory() {
    try {
      const category = await this.prisma.categoria.deleteMany({});
      return category;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar las categoria');
    }
  }

  async remove(id: number) {
    try {
      const category = await this.prisma.categoria.delete({
        where: { id },
      });
      return category;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar la categoria');
    }
  }
}
