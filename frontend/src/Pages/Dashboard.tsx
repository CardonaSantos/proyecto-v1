import React, { useEffect, useState } from "react";
import {
  Bell,
  Search,
  User,
  LogOut,
  Users,
  DollarSign,
  Briefcase,
  MapPin,
  Plus,
  Edit,
  Trash2,
  FileText,
  ChevronDown,
  User2Icon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import MyLeafletMap from "../components/Map/Map";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { useSocket } from "../Context/SocketProvider ";

interface connectedUser {
  totalConnectedUsers: number;
  totalEmployees: number;
  totalAdmins: number;
}

interface locationReceived {
  latitud: number;
  longitud: number;
  usuarioId: number;
}

export default function Dashboard() {
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

  const socket = useSocket();
  const [connectedUsers, setConnectedUsers] = useState<connectedUser>();

  useEffect(() => {
    if (socket) {
      socket.emit("requestConnectedUsers");

      const updateListener = (data) => {
        console.log("Datos recibidos del WebSocket:", data);
        setConnectedUsers(data);
      };

      socket.on("updateConnectedUsers", updateListener);

      return () => {
        socket.off("updateConnectedUsers", updateListener);
      };
    }
  }, [socket]);

  console.log("Los usuarios conectados son: ", connectedUsers);
  console.log(connectedUsers?.totalConnectedUsers);

  console.log("--------------------------------------------------");

  const [locations, setLocations] = useState<locationReceived[]>([]);

  useEffect(() => {
    if (socket) {
      const locationListener = (locationData: locationReceived) => {
        console.log("Nueva ubicación recibida:", locationData);
        // Aquí puedes actualizar el estado con la nueva ubicación
        // Por ejemplo, si tienes un estado para guardar las localizaciones:
        setLocations((prevLocations) => [...prevLocations, locationData]);
      };

      // Escuchar el evento de recepción de ubicación
      socket.on("receiveLocation", locationListener);

      return () => {
        // Limpiar el listener al desmontar el componente
        socket.off("receiveLocation", locationListener);
      };
    }
  }, [socket]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center flex-1">
            <h1 className="text-2xl font-bold m-3 text-gray-900 dark:text-white">
              Dashboard
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ingresos totales
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Q12,345</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ventas del día
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Q5,345</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Empleados activos
              </CardTitle>
              <User2Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {connectedUsers
                  ? connectedUsers.totalConnectedUsers
                  : "Cargando..."}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Citas en curso
              </CardTitle>
              <User2Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <User2Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
            </CardContent>
          </Card>
        </div>

        {/* Discount Requests Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Solicitudes de Descuento</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Descuento solicitado</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Carlos Rodríguez</TableCell>
                  <TableCell>Empresa XYZ</TableCell>
                  <TableCell>15%</TableCell>
                  <TableCell>Pendiente</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">
                      Aprobar
                    </Button>
                    <Button variant="outline" size="sm">
                      Rechazar
                    </Button>
                  </TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sales Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Últimas ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Juan Pérez</TableCell>
                  <TableCell>Laptop</TableCell>
                  <TableCell>$999.99</TableCell>
                  <TableCell>2023-05-15</TableCell>
                  <TableCell>Completado</TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mes</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Ventas</TableHead>
                  {/* <TableHead>Profit</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Enero</TableCell>
                  <TableCell>Q10,000</TableCell>
                  <TableCell>100</TableCell>
                  {/* <TableCell>Q5,000</TableCell> */}
                </TableRow>
                <TableRow>
                  <TableCell>Febrero</TableCell>
                  <TableCell>Q12,000</TableCell>
                  <TableCell>120</TableCell>
                  {/* <TableCell>Q6,000</TableCell> */}
                </TableRow>
                <TableRow>
                  <TableCell>Marzo</TableCell>
                  <TableCell>Q15,000</TableCell>
                  <TableCell>150</TableCell>
                  {/* <TableCell>Q7,500</TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Active Employees Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Empleados Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 relative overflow-hidden">
              {/* Placeholder for map */}
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                <MyLeafletMap locations={locations} />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Estado</TableHead>

                  <TableHead>Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>María González</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <a
                        href={`https://www.google.com/maps?q=15.6646,-91.7121`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        15.6646, -91.7121
                      </a>
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="default"
                      className={
                        "bg-green-500 text-white" // Para "Activo"
                      }
                    >
                      Activo
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Link to={"/empleados"}>
                      <Button variant="outline" size="sm">
                        Ver detalles
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between">
          <nav className="flex space-x-4 mb-4 sm:mb-0">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Términos y condiciones
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Política de privacidad
            </a>
          </nav>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; 2024 Sistema V1. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
// export default Dashboard;
