import { Rol } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsNotEmpty()
  contrasena: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  //Si es uno de los dos enums que tenemos en prisma tablas
  @IsEnum(Rol)
  rol: Rol;

  @IsNumber()
  id: number;
}
