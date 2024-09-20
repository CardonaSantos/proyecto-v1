import React, { useState } from "react";
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

// Datos de ejemplo
const historial = [
  {
    id: 1,
    vendedor: "Ana García",
    fecha: "2023-06-10",
    checkIn: "09:00",
    checkOut: "17:00",
    tiempoTotal: "8h",
    estado: "inactivo",
    ubicacionIn: "Oficina Central",
    ubicacionOut: "Oficina Central",
  },
  {
    id: 2,
    vendedor: "Carlos Pérez",
    fecha: "2023-06-10",
    checkIn: "08:30",
    checkOut: null,
    tiempoTotal: "En curso",
    estado: "activo",
    ubicacionIn: "Sucursal Norte",
    ubicacionOut: null,
  },
  {
    id: 3,
    vendedor: "María López",
    fecha: "2023-06-11",
    checkIn: "09:15",
    checkOut: "18:15",
    tiempoTotal: "9h",
    estado: "inactivo",
    ubicacionIn: "Oficina del Cliente",
    ubicacionOut: "Oficina del Cliente",
  },

  {
    id: 4,
    vendedor: "María López",
    fecha: "2024-06-11",
    checkIn: "09:15",
    checkOut: "18:15",
    tiempoTotal: "9h",
    estado: "inactivo",
    ubicacionIn: "Oficina del Cliente",
    ubicacionOut: "Oficina del Cliente",
  },
];

export default function SellerHistory() {
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("todos");
  const [fechas, setFechas] = useState({ from: undefined, to: undefined }); // Cambiar null a undefined

  const historialFiltrado = historial.filter((registro) => {
    const fechaRegistro = new Date(registro.fecha);
    const coincideNombre = registro.vendedor
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideEstado = estado === "todos" || registro.estado === estado;
    const coincideFecha =
      (!fechas.from || fechaRegistro >= fechas.from) &&
      (!fechas.to || fechaRegistro <= fechas.to);

    return coincideNombre && coincideEstado && coincideFecha;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Historial de Entrada y Salida</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Buscar empleado..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-grow"
        />
        {/* <Select value={estado} onValueChange={setEstado}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="activo">Activo</SelectItem>
            <SelectItem value="inactivo">Inactivo</SelectItem>
          </SelectContent>
        </Select> */}
        <Input
          type="date"
          className="bg-slate-900 text-white"
          selected={fechas} // Esto ahora es compatible con el componente Calendar
          onSelect={(range) => setFechas(range)} // Actualiza el rango de fechas
        />
        {/* selected={fechas} onSelect={setFechas} */}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empleado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Entrada</TableHead>
              <TableHead>Salida</TableHead>
              <TableHead>Tiempo Total</TableHead>
              {/* <TableHead>Estado</TableHead> */}
              {/* <TableHead>Ubicación</TableHead> */}
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historialFiltrado.map((registro) => (
              <TableRow key={registro.id}>
                <TableCell>{registro.vendedor}</TableCell>
                <TableCell>{registro.fecha}</TableCell>
                <TableCell>{registro.checkIn}</TableCell>
                <TableCell>{registro.checkOut || "En curso"}</TableCell>
                <TableCell>{registro.tiempoTotal}</TableCell>
                {/* <TableCell>
                  <Badge
                    variant={
                      registro.estado === "activo" ? "default" : "secondary"
                    }
                  >
                    {registro.estado}
                  </Badge>
                </TableCell> */}
                {/* <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{registro.ubicacionIn}</span>
                  </div>
                  {registro.ubicacionOut && (
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{registro.ubicacionOut}</span>
                    </div>
                  )}
                </TableCell> */}
                <TableCell>
                  <div className="flex gap-2">
                    <Link to={"/empleados"}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                        <span className="sr-only">Ver detalles</span>
                      </Button>
                    </Link>

                    {/* <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4" />
                      <span className="sr-only">Ver en mapa</span>
                    </Button> */}
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

// export default SellerHistory
