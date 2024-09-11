"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  MenuIcon,
  BellIcon,
  SettingsIcon,
  LogOutIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { ModeToggle } from "../ButtonToggleDarkMode";

const user = {
  name: "Admin V1",
  email: "admin@gmail.com",
  image: "/placeholder.svg?height=32&width=32",
};

const notifications = [
  {
    id: 1,
    title: "Solicitud de Descuento",
    content:
      "El vendedor Alberto Jesus esta solicitando un descuento del 12% para el cliente Mari Mileidy Camposeco",
  },
  {
    id: 2,
    title: "Registro de entrada",
    content: "El empleado Elizabeth R. se ha registrado",
  },
  {
    id: 3,
    title: "Registro de salida",
    content: "El empleado Fernanda M. ha registrado su salida",
  },
];

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Toolbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-4 py-2 text-base hover:bg-transparent focus:ring-0 flex items-center justify-center"
                >
                  <MenuIcon className="h-7 w-7" />{" "}
                  {/* Aumenta el tamaño del icono si es necesario */}
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <h2 className="text-lg font-semibold">Menú</h2>
                  <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="dashboard">
                        <AccordionTrigger className="w-full mb-1 justify-start text-black dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:border-transparent">
                          Dashboard
                        </AccordionTrigger>
                        <AccordionContent>
                          <Button
                            variant="outline"
                            className="w-full justify-start pl-4"
                          >
                            General
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start pl-4"
                          >
                            Analytics
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="projects">
                        <AccordionTrigger className="w-full mb-1 justify-start text-black dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:border-transparent">
                          Ventas
                        </AccordionTrigger>
                        <AccordionContent>
                          <Button
                            variant="outline"
                            className="w-full justify-start pl-4"
                          >
                            Historial
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start pl-4"
                          >
                            Otros
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="tasks">
                        <AccordionTrigger className="w-full mb-1 justify-start text-black dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:border-transparent">
                          Empleados
                        </AccordionTrigger>
                        <AccordionContent>
                          <Button
                            variant="outline"
                            className="w-full justify-start pl-4"
                          >
                            Lista y Activos
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start pl-4"
                          >
                            Rastreo
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Button
                      variant="outline"
                      className="w-full justify-start mt-2"
                    >
                      Otro
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Reportes
                    </Button>
                  </ScrollArea>
                </nav>
              </SheetContent>
            </Sheet>
            <a href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold">Sistema V1</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex items-center  space-x-4">
              <Dialog
                open={isNotificationsOpen}
                onOpenChange={setIsNotificationsOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="relative">
                    <BellIcon className="h-5 w-5" />
                    <span className="sr-only">Notificaciones</span>
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                      {notifications.length}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Notificaciones</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[300px] w-full">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="mb-4 last:mb-0 p-2 hover:bg-accent rounded-md"
                      >
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {notification.content}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-12 w-12">
                      {" "}
                      {/* Aumenta el tamaño aquí */}
                      <AvatarImage
                        sizes="lg"
                        src="https://i.pinimg.com/564x/42/68/0e/42680efba1697034c1590d881072b0d7.jpg"
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Config</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
