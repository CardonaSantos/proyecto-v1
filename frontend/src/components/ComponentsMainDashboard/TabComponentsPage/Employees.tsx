import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
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
const Employees = () => {
  // Datos de ejemplo para las ubicaciones
  const locations = [
    { lat: 15.6646, lng: -91.7121, name: "Alberto Jesús" }, // Ejemplo de empleado
    { lat: 15.6684, lng: -91.7104, name: "Mari Mileidy" },
    { lat: 15.6653, lng: -91.70697, name: "Elizabeth R." },
    { lat: 15.6611, lng: -91.7052, name: "Fernanda M." },
    { lat: 15.6532, lng: -91.7697, name: "Carlos Ed." },
    { lat: 15.6549, lng: -91.7727, name: "Faustina" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-2">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alberto Jesús</TableCell>
                <TableCell>Vendedor</TableCell>
                <TableCell>Activo</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fernanda M.</TableCell>
                <TableCell>Otro</TableCell>
                <TableCell>Inactivo</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Seguimiento de asistencia</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Hora de entrada</TableHead>
                <TableHead>Hora de salida</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alberto Jesús</TableCell>
                <TableCell>09:00 AM</TableCell>
                <TableCell>05:30 PM</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fernanda M.</TableCell>
                <TableCell>08:45 AM</TableCell>
                <TableCell>06:00 PM</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle> Localización de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] rounded-md border">
            <div className="h-full">
              <MyLeafletMap locations={locations} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
