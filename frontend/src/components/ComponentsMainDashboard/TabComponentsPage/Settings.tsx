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

const Settings = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Porcentajes de descuento para clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Descuento Actual</TableHead>
                <TableHead>Nuevo Descuento</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Mari Mileidy Camposeco </TableCell>
                <TableCell>10%</TableCell>
                <TableCell>
                  <input
                    type="number"
                    className="w-24 bg-white dark:bg-gray-700 text-black dark:text-white rounded border border-gray-300 dark:border-gray-600 p-1"
                    defaultValue={10}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Actualizar
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Santiago Alvarado Silvestre </TableCell>
                <TableCell>5%</TableCell>
                <TableCell>
                  <input
                    type="number"
                    className="w-24 bg-white dark:bg-gray-700 text-black dark:text-white rounded border border-gray-300 dark:border-gray-600 p-1"
                    defaultValue={5}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Actualizar
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Roles y Permisos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Permisos</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Admin</TableCell>
                <TableCell>Todo</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Manager</TableCell>
                <TableCell>Ver, Edit</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vendedor</TableCell>
                <TableCell>Ver</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
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

export default Settings;
