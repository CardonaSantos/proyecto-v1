import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";

const Sales = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 p-16">
      <Card>
        <CardHeader>
          <CardTitle>Historial de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2024-06-01</TableCell>
                <TableCell>Producto A</TableCell>
                <TableCell>15</TableCell>
                <TableCell>Q3,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-06-02</TableCell>
                <TableCell>Producto B</TableCell>
                <TableCell>3</TableCell>
                <TableCell>Q450</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-06-03</TableCell>
                <TableCell>Producto C</TableCell>
                <TableCell>2</TableCell>
                <TableCell>Q240</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Solicitudes de descuento</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Descuento %</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Elizabeth R.</TableCell>
                <TableCell>Mari Mileidy Camposeco</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Aprovar
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Alberto Jesús</TableCell>
                <TableCell>Santiago Alvarado Silvestre </TableCell>
                <TableCell>10%</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Aprovar
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
