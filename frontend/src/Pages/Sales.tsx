import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";

function Sales() {
  return (
    <div className=" bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold m-5">Historial de Ventas</h1>
        <Table>
          <TableCaption>Los registros no se pueden eliminar</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID Venta</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
              <TableHead className="text-right">Precio Unitario</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Método de Pago</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Notas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">001</TableCell>
              <TableCell>2023-05-15</TableCell>
              <TableCell>Juan Pérez</TableCell>
              <TableCell>Laptop HP 15"</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">Q799.99</TableCell>
              <TableCell className="text-right">Q799.99</TableCell>
              <TableCell>Tarjeta</TableCell>
              <TableCell>
                <Badge variant="default">Completada</Badge>
              </TableCell>
              <TableCell>Entrega a domicilio</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">002</TableCell>
              <TableCell>2023-05-16</TableCell>
              <TableCell>María González</TableCell>
              <TableCell>iPhone 13</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">Q999.00</TableCell>
              <TableCell className="text-right">Q1,998.00</TableCell>
              <TableCell>Contado</TableCell>
              <TableCell>
                <Badge variant="secondary">Pendiente</Badge>
              </TableCell>
              <TableCell>Recogida en tienda</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">003</TableCell>
              <TableCell>2023-05-17</TableCell>
              <TableCell>Carlos Rodríguez</TableCell>
              <TableCell>Monitor LG 27"</TableCell>
              <TableCell className="text-right">3</TableCell>
              <TableCell className="text-right">Q299.99</TableCell>
              <TableCell className="text-right">Q899.97</TableCell>
              <TableCell>Transferencia Bancaria</TableCell>
              <TableCell>
                <Badge variant="destructive">Cancelada</Badge>
              </TableCell>
              <TableCell>Cliente solicitó cancelación</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Sales;
