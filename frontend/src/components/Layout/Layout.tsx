"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  Home,
  Bell,
  ChevronDown,
  User,
  LogOut,
  User2,
  Users2Icon,
  HandCoins,
  BookUser,
  ListChecks,
  MessageSquareMore,
  ShoppingBasket,
  CirclePlus,
  SquareChartGanttIcon,
  PackageSearch,
  ShoppingBag,
  MailIcon,
  BookmarkCheck,
} from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Link, Outlet } from "react-router-dom";
import { ModeToggle } from "../ButtonToggleDarkMode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

import logo from "../../assets/images/logo.png";
import { jwtDecode } from "jwt-decode";
import { useSocket } from "../../Context/SocketProvider ";

const notifications = [
  { id: 1, message: "New message received" },
  { id: 2, message: "Your order has been shipped" },
  { id: 3, message: "Payment successful" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const socket = useSocket(); // Hook que retorna la instancia del WebSocket
  const [locationInterval, setLocationInterval] =
    useState<NodeJS.Timeout | null>(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Aquí manejas el cierre de sesión
    localStorage.removeItem("authToken");
    window.location.reload(); // O redirecciona al login
  };

  const [isOpen, setIsOpen] = useState(false);

  interface UserTokenInfo {
    nombre: string;
    correo: string;
    rol: string;
    sub: number;
  }

  interface locationReceived {
    latitud: number;
    longitud: number;
    usuarioId: number;
  }

  const [tokenUser, setTokenUser] = useState<UserTokenInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode<UserTokenInfo>(token);
        setTokenUser(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const sendMyLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        if (socket && tokenUser) {
          const locationData = {
            latitud: latitude,
            longitud: longitude,
            usuarioId: tokenUser.sub,
          };

          console.log("Enviando ubicación:", locationData);
          socket.emit("sendLocation", locationData);
        }
      });
    } else {
      console.error("Geolocation no está disponible en este navegador.");
    }
  };

  useEffect(() => {
    if (socket && tokenUser) {
      // Configurar intervalo para enviar la ubicación cada 30 segundos (30000ms)
      const interval = setInterval(() => {
        sendMyLocation();
      }, 60000); // Cambia el valor según la frecuencia deseada (milisegundos)

      setLocationInterval(interval);

      // Limpiar el intervalo al desmontar el componente o al desconectar
      return () => {
        if (locationInterval) {
          clearInterval(locationInterval);
        }
      };
    }
  }, [socket, tokenUser]);
  // 60000
  // 90000

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 border-r bg-gray-100/40 dark:bg-gray-800/50 lg:block">
        <nav className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4 bg-gray-200 dark:bg-gray-900">
            <Link to={"/"}>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Sistema V1
              </h1>
            </Link>
            <Link to={"/"}>
              <img src={logo} alt="myLogo" width={60} />
            </Link>
          </div>

          <ul className="flex-1 space-y-1 p-4 overflow-y-auto">
            {/* Home Item */}
            <li>
              <a
                href="/"
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <Home className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>Home</span>
              </a>
            </li>

            {/* Clientes Item */}
            <li>
              <Link
                to="/clientes"
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <User2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>Clientes</span>
              </Link>
            </li>

            {/* Ventas Item */}
            <li>
              <Link
                to="/ventas"
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <HandCoins className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>Ventas</span>
              </Link>
            </li>

            {/* Usuarios Item */}
            <li>
              <Link
                to="/usuarios"
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <Users2Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>Usuarios</span>
              </Link>
            </li>

            {/* Empleados Item */}
            <li>
              <Link
                to="/empleados"
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <BookUser className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>Empleados</span>
              </Link>
            </li>

            {/* Check Empleados Item */}
            <li>
              <Link
                to="/historial-empleados-check"
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <ListChecks className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>Check Empleados</span>
              </Link>
            </li>

            {/* Historial Citas Item */}
            <li>
              <Link
                to="/historial-citas"
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <MessageSquareMore className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>Historial Citas</span>
              </Link>
            </li>

            <li>
              <Link
                to="/hacer-ventas"
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <ShoppingBag className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>Hacer venta</span>
              </Link>
            </li>

            <li>
              <Link
                to="/registrar-entrada-salida"
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <BookmarkCheck className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>Check</span>
              </Link>
            </li>

            {/* Productos Collapsible Section */}
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-200 dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <ShoppingBasket className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span>Productos</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="smooth-scroll bg-gray-100 dark:bg-gray-900">
                <ul className="ml-6 mt-2 space-y-1  ">
                  <li>
                    <Link
                      to="/ver-productos"
                      className="flex gap-2 items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <PackageSearch className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      <p>Ver productos</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/crear-productos"
                      className="flex gap-2 items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <CirclePlus className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span>Crear productos</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/asignar-stock"
                      className="flex gap-2 items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <SquareChartGanttIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span>Inventario</span>
                    </Link>
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </ul>

          <div className="flex justify-center p-4 bg-gray-200 dark:bg-gray-900">
            <ModeToggle />
          </div>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* MENU PARA VERSION MOBILE */}
        <header className="flex h-14 items-center border-b px-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="default"
                className="mr-4 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 p-0 overflow-y-auto h-full max-h-screen"
            >
              <div className="flex h-14 items-center border-b px-4">
                <h1 className="text-lg font-semibold">Sistema V1</h1>
              </div>
              <nav className="flex h-full flex-col">
                <ul className="flex-1 space-y-1 p-4 overflow-y-auto">
                  {/* Home Item */}
                  <li>
                    <a
                      href="/"
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <Home className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span>Home</span>
                    </a>
                  </li>

                  {/* Clientes Item */}
                  <li>
                    <Link
                      to="/clientes"
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <User2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span>Clientes</span>
                    </Link>
                  </li>

                  {/* Ventas Item */}
                  <li>
                    <Link
                      to="/ventas"
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <HandCoins className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span>Ventas</span>
                    </Link>
                  </li>

                  {/* Usuarios Item */}
                  <li>
                    <Link
                      to="/usuarios"
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <Users2Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span>Usuarios</span>
                    </Link>
                  </li>

                  {/* Empleados Item */}
                  <li>
                    <Link
                      to="/empleados"
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <BookUser className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span>Empleados</span>
                    </Link>
                  </li>

                  {/* Check Empleados Item */}
                  <li>
                    <Link
                      to="/historial-empleados-check"
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <ListChecks className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span>Check Empleados</span>
                    </Link>
                  </li>

                  {/* Historial Citas Item */}
                  <li>
                    <Link
                      to="/historial-citas"
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <MessageSquareMore className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span>Historial Citas</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/hacer-ventas"
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <ShoppingBag className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span>Hacer venta</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/registrar-entrada-salida"
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <BookmarkCheck className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span>Check</span>
                    </Link>
                  </li>

                  {/* Productos Collapsible Section */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-200 dark:bg-gray-800">
                      <div className="flex items-center space-x-3">
                        <ShoppingBasket className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        <span>Productos</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="smooth-scroll bg-gray-100 dark:bg-gray-900">
                      <ul className="ml-6 mt-2 space-y-1  ">
                        <li>
                          <Link
                            to="/ver-productos"
                            className="flex gap-2 items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                          >
                            <PackageSearch className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                            <p>Ver productos</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/crear-productos"
                            className="flex gap-2 items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                          >
                            <CirclePlus className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            <span>Crear productos</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/asignar-stock"
                            className="flex gap-2 items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                          >
                            <SquareChartGanttIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            <span>Inventario</span>
                          </Link>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold lg:hidden">My App</h1>
          <div className="ml-auto flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="default">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Notifications</DialogTitle>
                </DialogHeader>
                <ul className="space-y-2">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className="p-2 bg-gray-100 dark:bg-gray-800 rounded"
                    >
                      {notification.message}
                    </li>
                  ))}
                </ul>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{tokenUser?.nombre}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MailIcon className="mr-2 h-4 w-4" />
                  <span>{tokenUser?.correo}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowLogoutModal(true)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />

            {/* Modal de confirmación de cierre de sesión */}
            <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
              <DialogContent>
                <DialogHeader>
                  <h3 className="text-center">Confirmar Cierre de Sesión</h3>
                  <p className="text-center">
                    ¿Estás seguro de que deseas cerrar sesión?
                  </p>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="m-1"
                    variant="outline"
                    onClick={() => setShowLogoutModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="m-1"
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-4xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
