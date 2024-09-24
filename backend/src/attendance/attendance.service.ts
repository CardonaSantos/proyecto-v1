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
      // Convertimos la fecha de hoy a formato "YYYY-MM-DD"
      const today = new Date().toISOString().split('T')[0];

      // Buscamos si ya existe un registro de entrada para el mismo usuario en la fecha de hoy
      const entradaDeHoy = await this.prisma.asistencia.findFirst({
        where: {
          usuarioId: createAttendanceDto.usuarioId,
          fecha: {
            equals: today + 'T00:00:00.000Z', // Comparamos solo con la fecha
          },
        },
      });

      if (entradaDeHoy) {
        console.log('Ya hay una marca de entrada');

        throw new BadRequestException('Ya se ha marcado la entrada de hoy');
      }

      // SOLO MARCAMOS LA ENTRADA
      const nuevaAsistencia = await this.prisma.asistencia.create({
        data: {
          fecha: today + 'T00:00:00.000Z', // Guardamos la fecha como "YYYY-MM-DDT00:00:00.000Z"
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
      // Usamos sólo la fecha sin la hora para comparación
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Establecemos el inicio del día

      const AttendanceToday = await this.prisma.asistencia.findFirst({
        where: {
          usuarioId: id,
          fecha: {
            equals: today.toISOString().split('T')[0] + 'T00:00:00.000Z', // Comparar solo con la fecha sin la hora
          },
          salida: null,
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
