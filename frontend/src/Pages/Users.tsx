import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { toast } from "sonner";
import { UsersSystem } from "../Utils/Types/User";

function Users() {
  const [users, setUsers] = useState<UsersSystem>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/");
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.info("No hay usuarios en este momento");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);

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
            {users &&
              users.map((user) => (
                <TableBody>
                  <TableRow>
                    <TableCell>{user.nombre}</TableCell>
                    <TableCell>{user.correo}</TableCell>
                    <TableCell>{user.rol}</TableCell>
                    <TableCell>
                      {new Date(user.creadoEn).toLocaleDateString()}
                    </TableCell>
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
              ))}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Users;
