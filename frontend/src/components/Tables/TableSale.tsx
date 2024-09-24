import React from "react";
import { SalesType } from "../../Utils/Types/Sales";

import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from "react-router-dom";

interface SalesTypeProp {
  sales: SalesType;
}

const TableSale: React.FC<SalesTypeProp> = ({ sales }) => {
  if (!sales || sales.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-5 text-center">
          Historial de Ventas
        </h1>
        <h2 className="text-center text-xl">No hay ventas que mostrar</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-1">
      <h1 className="text-2xl font-bold mb-5 text-center">
        Historial de Ventas
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        {sales &&
          sales.map((venta) => (
            <Card key={venta.id} className="w-full">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Venta #{venta.id}</span>
                  <a
                    href={`/comprobante-venta/${venta.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Badge variant="destructive">Conseguir comprobante</Badge>
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Fecha de venta</h3>
                    <p>{new Date(venta.timestamp).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Cliente</h3>
                    <p>{venta.cliente.nombre}</p>
                    <p>{venta.cliente.correo}</p>
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
                            <TableCell>{producto.producto.nombre}</TableCell>
                            <TableCell>{producto.cantidad}</TableCell>
                            <TableCell>Q{producto.precio.toFixed(2)}</TableCell>
                            <TableCell>
                              Q{producto.cantidad * producto.precio}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total de la venta:</span>
                    <span>Q{venta.monto.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center font-semibold">
                    <span>Total con descuento:</span>
                    <span>Q{venta.montoConDescuento.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center font-semibold">
                    <span>Descuento:</span>
                    <span>
                      {venta.descuento ? `${venta.descuento}%` : "No se aplicó"}{" "}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold">Vendedor</h3>
                    <p>{venta.vendedor.nombre}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Método de pago</h3>
                    <p>{venta.metodoPago}</p>
                  </div>

                  {/* <div>
                    <h3 className="font-semibold">Notas</h3>
                    <p>{venta.id}</p>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default TableSale;
