import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

function Users() {
  return (
    <div className=" bg-gray-100 dark:bg-gray-900">
      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestión de Usuarios</CardTitle>
          {/* <Button variant="default" size="default">
            <Plus className="mr-2 h-4 w-4" /> Agregar usuario
          </Button> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre de usuario</TableHead>
                <TableHead>Correo electrónico</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Última actividad</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>admin123</TableCell>
                <TableCell>admin@example.com</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>2023-05-15 14:30</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="default" size="default">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="default" size="default">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Users;
