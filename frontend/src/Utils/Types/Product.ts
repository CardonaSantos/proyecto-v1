interface Producto {
  id: number;
  nombre: string;
  descripcion: string; // Cambié a 'descripcion' para coincidir con los datos que recibes.
  precio: number;
  creadoEn: string;
  actualizadoEn: string;
  codigoProducto: string;
  stock: Stock | null; // Puede ser `null` como se ve en algunos de tus datos de ejemplo.
  categorias: Category[];
}

interface Stock {
  id: number;
  productoId: number;
  cantidad: number;
  proveedorId: number;
  costo: number;
  creadoEn: string;
  actualizadoEn: string;
}

interface Category {
  categoria: Categoria1;
  creadoEn: string;
}

interface Categoria1 {
  actualizadoEn: string;
  id: number;
  nombre: string;
}

export type Product = Producto; // Ajustamos `Product` a un solo producto.

export type ProductUnit = Producto; // Esto sigue siendo un alias para `Producto`.
