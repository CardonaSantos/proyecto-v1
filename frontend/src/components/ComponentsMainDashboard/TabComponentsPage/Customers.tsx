import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import MyLeafletMap from "../../Map/Map";
import { TabsContent } from "../../ui/tabs";

const Customers = () => {
  return (
    <TabsContent value="clients" className="flex justify-center">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>Administrar Clientes</CardTitle>
          <CardDescription>
            Ver y administrar los detalles del cliente{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Telefono</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Fecha de registro</TableHead>
                  <TableHead>Total de Ventas</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Mari Mileidy Camposeco</TableCell>
                  <TableCell>mileidys@gmail.com</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>+502 456 7890</TableCell>
                  <TableCell>Zona 12 Jacaltenango, Cantón Pila</TableCell>
                  <TableCell>2024-05-15</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Santiago Alvarado Silvestre</TableCell>
                  <TableCell>santsalv@gmail.com</TableCell>
                  <TableCell>Inactive</TableCell>
                  <TableCell>+502 654 3210</TableCell>
                  <TableCell>San Antonio, Zona 6 Cantón Reforma</TableCell>
                  <TableCell>2023-11-20</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
                {/* Puedes seguir añadiendo más filas con más clientes */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Customers;
