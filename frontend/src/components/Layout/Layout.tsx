"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Mail,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  User2,
  Users2Icon,
  HandCoins,
  BookUser,
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

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
    },
    {
      href: "/clientes",
      icon: User2,
      label: "Clientes",
    },
    {
      href: "/ventas",
      icon: HandCoins,
      label: "Ventas",
    },
    {
      href: "/usuarios",
      icon: Users2Icon,
      label: "Usuarios",
    },
    {
      href: "/empleados",
      icon: BookUser,
      label: "Empleados",
    },
    {
      label: "Services",
      icon: Settings,
      subItems: [
        { href: "/services/web", label: "Web Development" },
        { href: "/services/mobile", label: "Mobile Development" },
        { href: "/services/design", label: "Design" },
      ],
    },
  ];

  const notifications = [
    { id: 1, message: "New message received" },
    { id: 2, message: "Your order has been shipped" },
    { id: 3, message: "Payment successful" },
  ];

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

          <ul className="flex-1 space-y-1 p-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.subItems ? (
                  <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-200 dark:bg-gray-800">
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="smooth-scroll bg-gray-100 dark:bg-gray-900">
                      <ul className="ml-6 mt-2 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href={subItem.href}
                              className="block rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                            >
                              {subItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <item.icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <span>{item.label}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex justify-center p-4 bg-gray-200 dark:bg-gray-900">
            <ModeToggle />
          </div>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header for mobile and desktop */}
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
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-14 items-center border-b px-4">
                <h1 className="text-lg font-semibold">Sistema V1</h1>
              </div>
              <nav className="flex h-full flex-col">
                <ul className="flex-1 space-y-1 p-4">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      {item.subItems ? (
                        <Collapsible>
                          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                            <div className="flex items-center space-x-3">
                              <item.icon className="h-5 w-5" />
                              <span>{item.label}</span>
                            </div>
                            <ChevronDown className="h-4 w-4" />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <ul className="ml-6 mt-2 space-y-1">
                              {item.subItems.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <a
                                    href={subItem.href}
                                    className="block rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subItem.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <a
                          href={item.href}
                          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </a>
                      )}
                    </li>
                  ))}
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
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
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
