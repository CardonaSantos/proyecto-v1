import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Edit, MapPin, X } from "lucide-react";
import { Button } from "../components/ui/button";

// Datos de ejemplo
const citas = [
  {
    id: 1,
    vendedor: "Ana García",
    cliente: "Empresa A",
    inicio: "2023-06-10T10:00",
    fin: "2023-06-10T11:00",
    estado: "finalizada",
    ubicacion: "Oficina Central",
  },
  {
    id: 2,
    vendedor: "Carlos Pérez",
    cliente: "Empresa B",
    inicio: "2023-06-10T14:00",
    fin: null,
    estado: "en curso",
    ubicacion: "Sucursal Norte",
  },
  {
    id: 3,
    vendedor: "María López",
    cliente: "Empresa C",
    inicio: "2023-06-11T09:00",
    fin: null,
    estado: "pendiente",
    ubicacion: "Oficina del Cliente",
  },
];

export default function DatesView() {
  const [filtro, setFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("todos");

  const citasFiltradas = citas.filter((cita) =>
    tipoFiltro === "todos"
      ? true
      : tipoFiltro === "vendedor"
      ? cita.vendedor.toLowerCase().includes(filtro.toLowerCase())
      : cita.cliente.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Sistema de Seguimiento de Citas
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="flex-grow"
        />
        <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="vendedor">Vendedor</SelectItem>
            <SelectItem value="cliente">Cliente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {citasFiltradas.map((cita) => (
          <Card key={cita.id} className="flex flex-col">
            <CardContent className="flex-grow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{cita.vendedor}</h2>
                  <p className="text-sm text-gray-600">{cita.cliente}</p>
                </div>
                <Badge
                  variant={
                    cita.estado === "finalizada"
                      ? "secondary"
                      : cita.estado === "en curso"
                      ? "default"
                      : "outline"
                  }
                >
                  {cita.estado}
                </Badge>
              </div>
              <div className="space-y-2 mb-4">
                <p>
                  <strong>Inicio:</strong>{" "}
                  {new Date(cita.inicio).toLocaleString()}
                </p>
                {cita.fin && (
                  <p>
                    <strong>Fin:</strong> {new Date(cita.fin).toLocaleString()}
                  </p>
                )}
                <p>
                  <strong>Ubicación:</strong> {cita.ubicacion}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <MapPin className="mx-auto" size={24} />
                <p className="text-center text-sm mt-2">Mapa de ubicación</p>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  Ver detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
// export default DatesView
