import {
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  isString,
  IsString,
  MinLength,
} from 'class-validator';
import { Rol } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  correo: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  contrasena: string;

  @IsNotEmpty()
  @IsEnum(Rol) // Enum validado
  rol: Rol;

  // Aquí podrías añadir más lógica para manejar las ubicaciones
}
