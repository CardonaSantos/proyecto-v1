import { useState } from "react";
import {
  AlertCircle,
  Bell,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  LayoutDashboard,
  MapPin,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import MyLeafletMap from "../Map/Map";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./tabs.css"; // Asegúrate de definir las clases de animación en este archivo
import Sales from "./TabComponentsPage/Sales";
import Employees from "./TabComponentsPage/Employees";
import Customers from "./TabComponentsPage/Customers";
import Settings from "./TabComponentsPage/Settings";
import Report from "./TabComponentsPage/Report";
import Profile from "./TabComponentsPage/Profile";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

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
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Panel Administrador
        </h2>
        {/* <div className="flex items-center space-x-2">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div> */}
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="gap-2">
          <TabsTrigger
            className="bg-gray-700 text-gray-100 hover:bg-gray-600"
            value="overview"
            onClick={() => setActiveTab("dashboard")}
          >
            General
          </TabsTrigger>
          <TabsTrigger
            className="bg-gray-700 text-gray-100 hover:bg-gray-600"
            value="clients"
            onClick={() => setActiveTab("clients")}
          >
            Clientes
          </TabsTrigger>
          <TabsTrigger
            className="bg-gray-700 text-gray-100 hover:bg-gray-600"
            value="employees"
            onClick={() => setActiveTab("employees")}
          >
            Empleados
          </TabsTrigger>
          <TabsTrigger
            className="bg-gray-700 text-gray-100 hover:bg-gray-600"
            value="sales"
            onClick={() => setActiveTab("sales")}
          >
            Ventas
          </TabsTrigger>
          <TabsTrigger
            className="bg-gray-700 text-gray-100 hover:bg-gray-600"
            value="settings"
            onClick={() => setActiveTab("settings")}
          >
            Configuración
          </TabsTrigger>
          {/* <TabsTrigger
            className="bg-gray-700 text-gray-100 hover:bg-gray-600"
            value="reports"
            onClick={() => setActiveTab("reports")}
          >
            Reportes
          </TabsTrigger>
          <TabsTrigger
            className="bg-gray-700 text-gray-100 hover:bg-gray-600"
            value="profile"
            onClick={() => setActiveTab("profile")}
          >
            Perfil
          </TabsTrigger> */}
        </TabsList>
        {/* SECCION CON SUAVIZADO DE ANIMACION PARA TABS DE SECCIONES */}
        <TransitionGroup>
          <CSSTransition
            key={activeTab}
            timeout={300}
            classNames="tab-transition"
          >
            <div className="tab-content">
              {/* Content for Overview tab */}
              <TabsContent value="overview" className="space-y-4 p-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
                  {/* Revenue Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Ingresos Totales
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Q50,231</div>
                      <p className="text-xs text-muted-foreground">
                        +10% respecto al mes pasado
                      </p>
                    </CardContent>
                  </Card>

                  {/* Active Employees Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Empleados Activos
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">En línea</p>
                    </CardContent>
                  </Card>

                  {/* Sales Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Ventas
                      </CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">172</div>
                      <p className="text-xs text-muted-foreground">
                        +8% respecto al mes pasado
                      </p>
                    </CardContent>
                  </Card>

                  {/* Active Now Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Clientes
                      </CardTitle>
                      <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">82</div>
                      <p className="text-xs text-muted-foreground">
                        +20 respecto al mes pasado
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  {/* Overview Card */}
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>General</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Mes</TableHead>
                            <TableHead>Ingresos</TableHead>
                            <TableHead>Ventas</TableHead>
                            <TableHead>Ganancias</TableHead>
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

                  {/* Recent Sales Card */}
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Ventas Recientes</CardTitle>
                      <CardDescription>
                        Has hecho 256 ventas este mes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">
                              No.Factura
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Metodo</TableHead>
                            <TableHead className="text-right">
                              Cantidad
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              #INV001
                            </TableCell>
                            <TableCell>Pagado</TableCell>
                            <TableCell>Tarjeta</TableCell>
                            <TableCell className="text-right">
                              Q250.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              #INV002
                            </TableCell>
                            <TableCell>Pendiente</TableCell>
                            <TableCell>PayPal</TableCell>
                            <TableCell className="text-right">
                              Q150.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              #INV003
                            </TableCell>
                            <TableCell>No pagado</TableCell>
                            <TableCell>Transferencia por banco</TableCell>
                            <TableCell className="text-right">
                              Q350.00
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Conditional Tabs Content */}
              {activeTab === "clients" && <Customers />}

              {activeTab === "employees" && <Employees />}

              {activeTab === "sales" && <Sales />}

              {activeTab === "settings" && <Settings />}
              {/* {activeTab === "reports" && <Report />}
              {activeTab === "profile" && <Profile />} */}
            </div>
          </CSSTransition>
        </TransitionGroup>
        {/* Similar content blocks for other tabs... */}
      </Tabs>
    </div>
  );
}
