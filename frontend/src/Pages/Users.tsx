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
  const [users, setUsers] = useState<UsersSystem[]>([]);

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

  ///-----------------------------------
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UsersSystem | null>(null);
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    console.log("El user metido en el estado es: ", userToDelete);
    try {
      const response = await axios.delete(
        `http://localhost:3000/users/${userToDelete?.id}`
      );
      if (response.status === 200) {
        toast.success("Usuario eliminado exitosamente");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error el eliminar usuario");
    }
    setShowConfirmModal(false);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestión de Usuarios</CardTitle>
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
              {users &&
                users.map((user) => (
                  <TableRow key={user.id}>
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
                      <Button
                        variant="default"
                        size="default"
                        onClick={() => handleDeleteClick(user)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-4">
            <h2 className="text-lg text-center">Confirmar eliminación</h2>
            <p className="text-center">
              ¿Estás seguro de que deseas eliminar a {userToDelete?.nombre}?
            </p>
            <p>
              Todos los registros del usuario relacionado podrian alterarse y
              generar huecos de información
            </p>
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="default" onClick={cancelDelete}>
                Cancelar
              </Button>
              <Button variant="outline" onClick={confirmDelete}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
