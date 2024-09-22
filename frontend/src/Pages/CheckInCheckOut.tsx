import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { User } from "../Utils/Types/User";
import { jwtDecode } from "jwt-decode"; // No desestructurar aquí
import { CheckInToday } from "../Utils/Types/CheckInToday";
import { UserToken } from "../Utils/Types/UserTokenInfo";

function CheckInCheckOut() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserToken | null>(null);
  const [registro, setRegistro] = useState<CheckInToday | null>(null);
  console.log(registro);

  const UserToken = localStorage.getItem("authToken");

  console.log("Mi user token: ", UserToken);

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
    setLoading(true);
    try {
      const fechaActual = new Date();
      const payload = {
        usuarioId: user?.sub,
        fecha: fechaActual.toISOString().split("T")[0] + "T00:00:00.000Z",
        entrada: fechaActual.toISOString(),
      };

      console.log("Enviando datos de entrada:", payload);

      const response = await axios.post(
        "http://localhost:3000/attendance/check-in",
        payload
      );
      if (response.status === 201) {
        toast.success("Entrada registrada");
        getTodayCheck(); // Actualiza el registro después de hacer check-in
      }
    } catch (error) {
      toast.error("Error al registrar entrada");
    } finally {
      setLoading(false);
    }
  };

  const registrarSalida = async () => {
    if (!user) return; // Verifica que el usuario esté definido antes de hacer la solicitud
    setLoading(true);
    try {
      const fechaActual = new Date();
      const payload = {
        fecha: fechaActual.toISOString().split("T")[0] + "T00:00:00.000Z",
        salida: fechaActual.toISOString(),
      };

      console.log("Enviando datos de salida:", payload);

      const response = await axios.patch(
        `http://localhost:3000/attendance/check-out/${registro?.id}`,
        payload
      );
      if (response.status === 200) {
        toast.success("Salida registrada con éxito");
        getTodayCheck(); // Actualiza el registro después de hacer check-out
      }
    } catch (error) {
      toast.error("Error al registrar salida");
    } finally {
      setLoading(false);
    }
  };

  console.log(registro);
  console.log(user?.sub);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Registro de Entrada y Salida
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={registrarEntrada}
            disabled={loading}
          >
            Registrar Entrada
          </Button>
          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={registrarSalida}
            disabled={loading}
          >
            Registrar Salida
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default CheckInCheckOut;
