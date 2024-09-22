export interface User {
  id: number;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: string;
  creadoEn: string;
  actualizadoEn: string;
}

export type UsersSystem = User;
