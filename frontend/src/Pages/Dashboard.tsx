import React, { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import MyLeafletMap from "../components/Map/Map";

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center flex-1">
            <h1 className="text-2xl font-bold m-3 text-gray-900 dark:text-white">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar"
                className="pl-10 w-full md:w-64"
              />
            </div>
            <Dialog
              open={showNotifications}
              onOpenChange={setShowNotifications}
            >
              {/* <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notificaciones</span>
                </Button>
              </DialogTrigger> */}
            </Dialog>
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
              <div className="text-2xl font-bold">12</div>
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
                  <TableHead>Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Enero</TableCell>
                  <TableCell>Q10,000</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>Q5,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Febrero</TableCell>
                  <TableCell>Q12,000</TableCell>
                  <TableCell>120</TableCell>
                  <TableCell>Q6,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Marzo</TableCell>
                  <TableCell>Q15,000</TableCell>
                  <TableCell>150</TableCell>
                  <TableCell>Q7,500</TableCell>
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
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4">
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
                  <TableHead>Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>María González</TableCell>
                  <TableCell>Oficina Central</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* User Management Section */}
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Gestión de Usuarios</CardTitle>
            <Button variant="default" size="default">
              <Plus className="mr-2 h-4 w-4" /> Agregar usuario
            </Button>
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
                <TableRow>
                  <TableCell>admin123</TableCell>
                  <TableCell>admin@example.com</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>2023-05-15 14:30</TableCell>
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
            </Table>
          </CardContent>
        </Card>

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

        {/* Reports Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Reportes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Input type="date" className="w-auto" />
                <Input type="date" className="w-auto" />
                <Button>Generar reporte</Button>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> Exportar CSV
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> Exportar PDF
                </Button>
              </div>
            </div>
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
            &copy; 2023 Tu Empresa. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
// export default Dashboard;
