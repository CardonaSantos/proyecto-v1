interface Venta {
  id: number;
  monto: number;
  timestamp: string;
  usuarioId: number;
  clienteId: number;
  citaId: number | null;
}

interface Cliente {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
  creadoEn: string;
  actualizadoEn: string;
  ventas: Venta[];
}

export type Clientes = Cliente[];
