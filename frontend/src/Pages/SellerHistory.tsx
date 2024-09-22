import React, { useEffect, useState } from "react";
import { Search, MapPin, Download, Eye } from "lucide-react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Calendar } from "../components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { Asistencias } from "../Utils/Types/Attendance";
import { format, differenceInHours, differenceInMinutes } from "date-fns"; // Importar differenceInMinutes también
import { es } from "date-fns/locale"; // Importar el idioma español

export default function SellerHistory() {
  const [assistencia, setAssistencia] = useState<Asistencias>([]);

  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("todos");
  const [fechas, setFechas] = useState({ from: undefined, to: undefined }); // Cambiar null a undefined

  // Filtrado del historial según búsqueda, estado y fechas
  const historialFiltrado = assistencia.filter((registro) => {
    const fechaRegistro = new Date(registro.fecha);
    const coincideNombre = registro.usuario.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideEstado = estado === "todos" || registro.estado === estado;
    const coincideFecha =
      (!fechas.from || fechaRegistro >= fechas.from) &&
      (!fechas.to || fechaRegistro <= fechas.to);

    return coincideNombre && coincideEstado && coincideFecha;
  });

  // Llamada a la API para obtener la asistencia
  useEffect(() => {
    const getAttendance = async () => {
      const response = await axios.get("http://localhost:3000/attendance/");
      if (response.status === 200) {
        setAssistencia(response.data);
      }
    };

    getAttendance();
  }, []);

  console.log(assistencia);

  const miFechayHora = new Date();
  console.log(miFechayHora);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Historial de Entrada y Salida</h1>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empleado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Entrada</TableHead>
              <TableHead>Salida</TableHead>
              <TableHead>Tiempo Total</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historialFiltrado.map((registro) => (
              <TableRow key={registro.id}>
                {/* Nombre del empleado */}
                <TableCell>{registro.usuario.nombre}</TableCell>

                {/* Formatear la fecha de entrada */}
                <TableCell>
                  {format(new Date(registro.entrada), "dd MMMM yyyy", {
                    locale: es,
                  })}
                </TableCell>

                {/* Formatear la hora de entrada */}
                <TableCell>
                  {format(new Date(registro.entrada), "hh:mm a", {
                    locale: es,
                  })}
                </TableCell>

                {/* Formatear la hora de salida o mostrar "En curso" si es null */}
                <TableCell>
                  {registro.salida
                    ? format(new Date(registro.salida), "hh:mm a", {
                        locale: es,
                      })
                    : "En curso"}
                </TableCell>

                {/* Calcular y mostrar el tiempo total (diferencia entre salida y entrada) */}
                <TableCell>
                  {registro.salida
                    ? `${Math.floor(
                        differenceInMinutes(
                          new Date(registro.salida),
                          new Date(registro.entrada)
                        ) / 60
                      )}h ${
                        differenceInMinutes(
                          new Date(registro.salida),
                          new Date(registro.entrada)
                        ) % 60
                      }m`
                    : "En curso"}
                </TableCell>

                {/* Acciones (Ver detalles del empleado) */}
                <TableCell>
                  <div className="flex gap-2">
                    <Link to={`/empleados/${registro.usuarioId}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                        <span className="sr-only">Ver detalles</span>
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-end">
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Exportar Historial
        </Button>
      </div>
    </div>
  );
}
