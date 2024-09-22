type Producto = {
  id: number;
  productoId: number;
  categoriaId: number;
  creadoEn: string;
  actualizadoEn: string;
};

export type CategoriaFiltrar = {
  id: number;
  nombre: string;
  creadoEn: string;
  actualizadoEn: string;
  productos: Producto[];
};
