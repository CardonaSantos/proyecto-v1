interface Categoria {
  id: number;
  nombre: string;
  creadoEn: string; // O puedes usar Date
  actualizadoEn: string; // O puedes usar Date
  // productos: Producto[];
}

export type Categorias = Categoria;
