import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}
  async createCheckIn(createAttendanceDto: CreateAttendanceDto) {
    try {
      //buscar el registro de hoy y actualizarlo
      const entradaDeHoy = await this.prisma.asistencia.findFirst({
        where: {
          usuarioId: createAttendanceDto.usuarioId,
          fecha: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      });

      if (entradaDeHoy) {
        throw new BadRequestException('Ya se ha marcado la entrada de hoy');
      }

      //SOLO MARCAMOS LA ENTRADA
      const nuevaAsistencia = await this.prisma.asistencia.create({
        data: {
          fecha: createAttendanceDto.fecha,
          entrada: createAttendanceDto.entrada,
          usuarioId: createAttendanceDto.usuarioId,
        },
      });

      return nuevaAsistencia;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear asistencia');
    }
  }

  async createCheckOut(
    updateAttendanceDto: UpdateAttendanceDto,
    asistenciaId: number,
  ) {
    try {
      //Terminar de marcar la salida
      const marcarSalida = await this.prisma.asistencia.update({
        where: { id: asistenciaId },
        data: updateAttendanceDto,
      });
      return marcarSalida;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear asistencia');
    }
  }

  async findAll() {
    try {
      const Attendances = await this.prisma.asistencia.findMany({
        include: {
          usuario: {
            select: {
              id: true,
              nombre: true,
              correo: true,
              rol: true,
            },
          },
        },
      });
      return Attendances;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear asistencia');
    }
  }

  async findOne(id: number) {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); // Inicio del día
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // Fin del día

      const AttendanceToday = await this.prisma.asistencia.findFirst({
        where: {
          usuarioId: id,
          fecha: {
            gte: startOfDay, // Fecha mayor o igual al inicio del día
            lte: endOfDay, // Fecha menor o igual al fin del día
          },
        },
      });

      console.log('El id de hoy es: ', id);
      console.log('El registro de hoy es: ', AttendanceToday);

      return AttendanceToday;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al conseguir asistencias');
    }
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  async removeAll() {
    try {
      const AttendancesRemove = await this.prisma.asistencia.deleteMany({});
      return AttendancesRemove;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al eliminar todas las asistencia',
      );
    }
  }

  async remove(id: number) {
    try {
      const Attendance = await this.prisma.asistencia.delete({
        where: { id },
      });
      return Attendance;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar la asistencia');
    }
  }
}
