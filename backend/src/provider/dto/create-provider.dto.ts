import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  // @IsString()
  // @IsNotEmpty()
  // nombre:string
}

// model Proveedor {
//     id          Int       @id @default(autoincrement())
//     nombre      String
//     correo      String    @unique
//     telefono    String
//     direccion   String?
//     productos   Stock[]   // Relación con el stock de productos

//     creadoEn    DateTime  @default(now())
//     actualizadoEn DateTime @updatedAt
//   }
