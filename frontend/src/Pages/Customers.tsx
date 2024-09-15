import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Button } from "../components/ui/button";

function Customers() {
  return (
    <div className=" bg-gray-100 dark:bg-gray-900">
      <Card>
        <CardHeader>
          <CardTitle>Administrar Clientes</CardTitle>
          <CardDescription>Ver y editar clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>correo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Cliente De Pruebas</TableCell>
                <TableCell>prueba@gmail.com</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Cliente De Pruebas</TableCell>
                <TableCell>prueba@gmail.com</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cliente De Pruebas</TableCell>
                <TableCell>prueba@gmail.com</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cliente De Pruebas</TableCell>
                <TableCell>prueba@gmail.com</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cliente De Pruebas</TableCell>
                <TableCell>prueba@gmail.com</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cliente De Pruebas</TableCell>
                <TableCell>prueba@gmail.com</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Customers;
