"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Clock, MapPin, User, Calendar } from "lucide-react";
import L from "leaflet";

// Asegúrate de importar los estilos de Leaflet
import "leaflet/dist/leaflet.css";
import { Card, CardContent } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

// Datos de ejemplo (en una aplicación real, estos vendrían de una API)
const employeesData = [
  {
    id: 1,
    name: "Alberto Jesús",
    location: { lat: 15.6646, lng: -91.7121 },
    status: "active",
    checkIn: "08:30",
    checkOut: "",
    currentAppointment: {
      client: "Empresa XYZ",
      startTime: "09:30",
      endTime: "",
    },
  },
  {
    id: 2,
    name: "Mari Mileidy",
    location: { lat: 15.6684, lng: -91.7104 },
    status: "inactive",
    checkIn: "07:45",
    checkOut: "16:30",
    currentAppointment: null,
  },
  {
    id: 3,
    name: "Elizabeth R.",
    location: { lat: 15.6653, lng: -91.70697 },
    status: "active",
    checkIn: "09:00",
    checkOut: "",
    currentAppointment: {
      client: "Tienda Local",
      startTime: "10:30",
      endTime: "",
    },
  },
  {
    id: 4,
    name: "Fernanda M.",
    location: { lat: 15.6611, lng: -91.7052 },
    status: "inactive",
    checkIn: "08:15",
    checkOut: "17:00",
    currentAppointment: null,
  },
  {
    id: 5,
    name: "Carlos Ed.",
    location: { lat: 15.6532, lng: -91.7697 },
    status: "active",
    checkIn: "06:50",
    checkOut: "",
    currentAppointment: {
      client: "Restaurante La Paz",
      startTime: "09:00",
      endTime: "",
    },
  },
  {
    id: 6,
    name: "Faustina",
    location: { lat: 15.6549, lng: -91.7727 },
    status: "inactive",
    checkIn: "07:30",
    checkOut: "15:45",
    currentAppointment: null,
  },
];

export default function Employees() {
  const [employees, setEmployees] = useState(employeesData);

  // En una aplicación real, aquí se actualizarían los datos en tiempo real
  useEffect(() => {
    // Simular actualización de datos cada 5 segundos
    const interval = setInterval(() => {
      // Aquí iría la lógica para obtener datos actualizados de la API
      // Por ahora, solo actualizamos el estado con los mismos datos
      setEmployees([...employeesData]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seguimiento de Empleados</h1>

      <Card className="mb-8 relative">
        <CardContent>
          <MapContainer
            center={[15.6646, -91.7121]} // Coordenadas de tu pueblo
            zoom={13}
            style={{ height: "400px", width: "100%", zIndex: 0 }} // Asegura que el mapa esté en un nivel bajo
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {employees.map((employee) => (
              <Marker
                key={employee.id}
                position={[employee.location.lat, employee.location.lng]}
                icon={L.divIcon({
                  className: "", // Quita clases innecesarias
                  html: `<div class="w-3   h-3 rounded-full ${
                    employee.status === "active" ? "bg-green-500" : "bg-red-500"
                  }"></div>`,
                  iconSize: [8, 8], // Tamaño más pequeño para solo el punto
                })}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{employee.name}</h3>
                    <p>
                      Estado:{" "}
                      {employee.status === "active" ? "Activo" : "Inactivo"}
                    </p>
                    {employee.currentAppointment && (
                      <p>En cita con: {employee.currentAppointment.client}</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </CardContent>
      </Card>

      <Table>
        <TableCaption>Lista de empleados y su estado actual</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Entrada</TableHead>
            <TableHead>Salida</TableHead>
            <TableHead>Cita Actual</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  <MapPin className="w-4 h-4 mr-1" />
                  {employee.location.lat.toFixed(4)},{" "}
                  {employee.location.lng.toFixed(4)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="default"
                  className={
                    employee.status === "active"
                      ? "bg-green-500 text-white" // Para "Activo"
                      : "bg-red-500 text-white" // Para "Inactivo"
                  }
                >
                  {employee.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </TableCell>
              <TableCell>
                <Clock className="w-4 h-4 inline mr-1" />
                {employee.checkIn}
              </TableCell>
              <TableCell>
                <Clock className="w-4 h-4 inline mr-1" />
                {employee.checkOut || "En progreso"}
              </TableCell>
              <TableCell>
                {employee.currentAppointment ? (
                  <div>
                    <Badge variant="secondary">
                      <User className="w-4 h-4 mr-1" />
                      {employee.currentAppointment.client}
                    </Badge>
                    <br />
                    <Badge variant="outline" className="mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {employee.currentAppointment.startTime} -{" "}
                      {employee.currentAppointment.endTime || "En progreso"}
                    </Badge>
                  </div>
                ) : (
                  "Sin cita"
                )}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Ver detalles
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
// export default Employees
