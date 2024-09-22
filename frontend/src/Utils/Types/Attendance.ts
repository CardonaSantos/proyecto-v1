interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: "ADMIN" | "VENDEDOR"; // Asegúrate de incluir todos los roles posibles.
}

interface Asistencia {
  id: number;
  fecha: string; // Puedes usar Date si lo prefieres, pero será necesario convertirlo.
  entrada: string; // Igualmente, puedes usar Date si prefieres trabajar con objetos Date.
  salida?: string; // Opcional, ya que puede estar en null.
  usuarioId: number;
  creadoEn: string; // También puedes usar Date para esto, pero recuerda convertirlo.
  usuario: Usuario; // Añadido el objeto usuario
}

export type Asistencias = Asistencia[];
