export type Descuento = {
  id: number;
  porcentaje: number;
  clienteId: number;
  activo: boolean;
  creadoEn: string; // Puede ser Date si prefieres manejarlo como objeto Date
  actualizadoEn: string; // Igualmente, puede ser Date
};

export type Cliente = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
  creadoEn: string; // O Date
  actualizadoEn: string; // O Date
  descuentos: Descuento[]; // Array de descuentos asociados
};
