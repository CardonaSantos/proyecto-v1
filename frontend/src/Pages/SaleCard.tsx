import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const ventas = [
  {
    id: "V001",
    fecha: "20 de Septiembre de 2023, 14:30",
    cliente: {
      nombre: "María González",
      email: "maria@ejemplo.com",
      telefono: "+34 123 456 789",
    },
    productos: [
      { nombre: "Laptop HP", cantidad: 1, precio: 899.99, total: 899.99 },
      { nombre: "Mouse inalámbrico", cantidad: 2, precio: 29.99, total: 59.98 },
    ],
    total: 959.97,
    vendedor: "Carlos Rodríguez",
    metodoPago: "Tarjeta de crédito",
    estado: "Completada",
    notas: "Entrega a domicilio",
  },
  {
    id: "V002",
    fecha: "21 de Septiembre de 2023, 10:15",
    cliente: {
      nombre: "Juan Pérez",
      email: "juan@ejemplo.com",
      telefono: "+34 987 654 321",
    },
    productos: [
      { nombre: "Monitor 4K", cantidad: 1, precio: 349.99, total: 349.99 },
      { nombre: "Teclado mecánico", cantidad: 1, precio: 89.99, total: 89.99 },
    ],
    total: 439.98,
    vendedor: "Ana Martínez",
    metodoPago: "Efectivo",
    estado: "Pendiente",
    notas: "Cliente solicitó factura",
  },
];

export default function HistorialVentas() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Historial de Ventas</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {ventas.map((venta) => (
          <Card key={venta.id} className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Venta #{venta.id}</span>
                <Badge
                  variant={
                    venta.estado === "Completada"
                      ? "default"
                      : venta.estado === "Pendiente"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {venta.estado}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Fecha de venta</h3>
                  <p>{venta.fecha}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Cliente</h3>
                  <p>{venta.cliente.nombre}</p>
                  <p>{venta.cliente.email}</p>
                  <p>{venta.cliente.telefono}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Productos</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {venta.productos.map((producto, index) => (
                        <TableRow key={index}>
                          <TableCell>{producto.nombre}</TableCell>
                          <TableCell>{producto.cantidad}</TableCell>
                          <TableCell>{producto.precio.toFixed(2)} €</TableCell>
                          <TableCell>{producto.total.toFixed(2)} €</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-between items-center font-semibold">
                  <span>Total de la venta:</span>
                  <span>{venta.total.toFixed(2)} €</span>
                </div>
                <div>
                  <h3 className="font-semibold">Vendedor</h3>
                  <p>{venta.vendedor}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Método de pago</h3>
                  <p>{venta.metodoPago}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Notas</h3>
                  <p>{venta.notas}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
