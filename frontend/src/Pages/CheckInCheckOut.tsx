import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // No desestructurar aquí
import { CheckInToday } from "../Utils/Types/CheckInToday";
import { UserToken } from "../Utils/Types/UserTokenInfo";
import { format } from "date-fns"; // Importar differenceInMinutes también
import { es } from "date-fns/locale"; // Importar el idioma español

function CheckInCheckOut() {
  const [user, setUser] = useState<UserToken | null>(null);
  const [registro, setRegistro] = useState<CheckInToday | null>(null);
  const [showEntradaConfirm, setShowEntradaConfirm] = useState(false);
  const [showSalidaConfirm, setShowSalidaConfirm] = useState(false);

  const UserToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (UserToken) {
      try {
        const decodedUser: UserToken = jwtDecode(UserToken);
        setUser(decodedUser); // Asegurarse de que jwtDecode esté decodificando correctamente
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [UserToken]);

  useEffect(() => {
    if (user && user.sub) {
      getTodayCheck(); // Sólo llama a la función si el user está disponible y tiene ID
    }
  }, [user]); // 'user' es la dependencia aquí

  const getTodayCheck = async () => {
    if (!user || !user.sub) return; // Verifica si el usuario y su ID están definidos

    try {
      const response = await axios.get(
        `http://localhost:3000/attendance/today-check/${user.sub}`
      );
      if (response.status === 200 || response.status === 201) {
        setRegistro(response.data);
      }
    } catch (error) {
      toast.info("No se ha creado ningún registro de entrada hoy");
    }
  };

  const registrarEntrada = async () => {
    if (!user) return; // Verifica que el usuario esté definido antes de hacer la solicitud
    try {
      const fechaActual = new Date();
      const payload = {
        usuarioId: user?.sub,
        fecha: fechaActual.toISOString().split("T")[0] + "T00:00:00.000Z",
        entrada: fechaActual.toISOString(),
      };

      const response = await axios.post(
        "http://localhost:3000/attendance/check-in",
        payload
      );

      if (response.status === 201) {
        toast.success("Entrada registrada");
        getTodayCheck(); // Actualiza el registro después de hacer check-in
      }
    } catch (error) {
      toast.error("Ya se han creado todos los registros de este día");
    }
  };

  const registrarSalida = async () => {
    if (!user) return; // Verifica que el usuario esté definido antes de hacer la solicitud
    try {
      const fechaActual = new Date();
      const payload = {
        fecha: fechaActual.toISOString().split("T")[0] + "T00:00:00.000Z",
        salida: fechaActual.toISOString(),
      };

      const response = await axios.patch(
        `http://localhost:3000/attendance/check-out/${registro?.id}`,
        payload
      );
      if (response.status === 200) {
        toast.success("Salida registrada con éxito");
        getTodayCheck(); // Actualiza el registro después de hacer check-out
      }
    } catch (error) {
      toast.error("Ya se han creado todos los registros de este día");
    }
  };
  console.log(registro);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Registro de Entrada y Salida
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full border-none bg-green-500 hover:bg-green-600 dark:text-white font-bold"
            onClick={() => setShowEntradaConfirm(true)}
            disabled={registro}
          >
            Registrar Entrada
          </Button>
          <div className="">
            {registro ? (
              <div className="">
                <h2 className="text-center font-bold">
                  Se ha marcado tu entrada
                </h2>
                {/* <h3>{registro.entrada}</h3> */}
                <h2 className="text-center font-bold">
                  {format(new Date(registro.entrada), "hh:mm a", {
                    locale: es,
                  })}
                </h2>
              </div>
            ) : null}
          </div>
          <Button
            className="w-full border-none bg-red-500 hover:bg-red-600 dark:text-white font-bold"
            onClick={() => setShowSalidaConfirm(true)}
            disabled={!registro?.entrada}
          >
            Registrar Salida
          </Button>
        </CardContent>
      </Card>

      {/* Modal para confirmar la entrada */}
      <Dialog open={showEntradaConfirm} onOpenChange={setShowEntradaConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Confirmar Registro de Entrada
            </DialogTitle>
          </DialogHeader>
          <p>¿Estás seguro que deseas registrar tu entrada?</p>
          <DialogFooter>
            <Button
              className="bg-red-500 border-none hover:bg-red-600 dark:text-white font-semibold"
              onClick={() => setShowEntradaConfirm(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-green-500 dark:text-white font- hover:bg-green-600 border-none  mb-2 "
              onClick={() => {
                setShowEntradaConfirm(false);
                registrarEntrada();
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para confirmar la salida */}
      <Dialog open={showSalidaConfirm} onOpenChange={setShowSalidaConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Registro de Salida</DialogTitle>
          </DialogHeader>
          <p>¿Estás seguro que deseas registrar tu salida?</p>
          <DialogFooter>
            <Button
              className="bg-red-500 border-none hover:bg-red-600 dark:text-white font-semibold "
              onClick={() => setShowSalidaConfirm(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-green-500 dark:text-white font- hover:bg-green-600 border-none mb-2 "
              onClick={() => {
                setShowSalidaConfirm(false);
                registrarSalida();
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CheckInCheckOut;
