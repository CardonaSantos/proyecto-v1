import { IsEmail, IsNotEmpty } from 'class-validator';

export class loginDTO {
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsNotEmpty()
  contrasena: string;
}
