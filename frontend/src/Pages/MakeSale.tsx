import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { ScrollArea } from "../components/ui/scroll-area";
import { Textarea } from "../components/ui/textarea";
// import { useTheme } from "next-themes";
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  TagIcon,
  CheckIcon,
  XIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";

export default function MakeSale() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [customDiscountRequested, setCustomDiscountRequested] = useState(false);
  const [customDiscountPercentage, setCustomDiscountPercentage] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  //   const { theme, setTheme } = useTheme();

  // Datos de ejemplo
  const products = [
    {
      id: 1,
      name: "Camiseta Básica",
      code: "CB001",
      category: "Camisetas",
      colors: ["Blanco", "Negro"],
      stock: 50,
      price: 19.99,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Pantalón Vaquero",
      code: "PV002",
      category: "Pantalones",
      colors: ["Azul", "Negro"],
      stock: 30,
      price: 49.99,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Vestido Floral",
      code: "VF003",
      category: "Vestidos",
      colors: ["Rojo", "Azul"],
      stock: 20,
      price: 39.99,
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  const customers = [
    { id: 1, name: "María García", discounts: [10, 5] },
    { id: 2, name: "Juan Pérez", discounts: [15] },
  ];

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const requestCustomDiscount = () => {
    setCustomDiscountRequested(true);
    // Aquí iría la lógica para enviar la solicitud al administrador
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discountPercentage = selectedDiscount ? selectedDiscount / 100 : 0;
    return (subtotal * (1 - discountPercentage)).toFixed(2);
  };

  const filteredProducts = products.filter(
    (product) =>
      (searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "Todas" || product.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Sistema de Ventas de Ropa</h1>
          {/* <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button> */}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="mb-8">
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <SearchIcon className="text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar productos por nombre o código"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todas">Todas</SelectItem>
                      <SelectItem value="Camisetas">Camisetas</SelectItem>
                      <SelectItem value="Pantalones">Pantalones</SelectItem>
                      <SelectItem value="Vestidos">Vestidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    {/* <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover mb-4 rounded"
                    /> */}
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.code}
                    </p>
                    <div className="flex flex-wrap gap-2 my-2">
                      {/* {product.category.map((color) => ( */}
                      <Badge key={product.id} variant="outline">
                        {product.category}
                      </Badge>
                      {/* //   ))} */}
                    </div>
                    <p className="font-semibold mt-2">
                      Q{product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {product.stock}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      Añadir al Carrito
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card className="mb-8">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">
                  Carrito de Compras
                </h2>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground">El carrito está vacío</p>
                ) : (
                  <ScrollArea className="h-[300px]">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between mb-4"
                      >
                        <div className="flex items-center">
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Q{item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Input
                            type="number"
                            min="1"
                            max={item.stock}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                            className="w-16 mr-2"
                          />
                          <Button
                            variant="destructive"
                            size="default"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="font-semibold">Total:</p>
                <p className="font-semibold">Q{calculateTotal()}</p>
              </CardFooter>
            </Card>

            <Card className="mb-8">
              <CardContent>
                <h3 className="text-md font-semibold mb-4">
                  Selección de Cliente
                </h3>
                <Select
                  value={selectedCustomer?.id}
                  onValueChange={(value) => {
                    setSelectedCustomer(
                      customers.find((c) => c.id === parseInt(value))
                    );
                    setSelectedDiscount(null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem
                        key={customer.id}
                        value={customer.id.toString()}
                      >
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <h3 className="text-md font-semibold mb-4">Metódo de pago</h3>
                <Select
                  value={selectedCustomer?.id}
                  onValueChange={(value) => {
                    setSelectedCustomer(
                      customers.find((c) => c.id === parseInt(value))
                    );
                    setSelectedDiscount(null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                    <SelectItem value="Transferencia">Transferencia</SelectItem>
                    <SelectItem value="Contado">Contado</SelectItem>
                  </SelectContent>
                </Select> */}
                {selectedCustomer && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">
                      Descuentos disponibles:
                    </h3>
                    <Select
                      value={selectedDiscount?.toString()}
                      onValueChange={(value) =>
                        setSelectedDiscount(parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar descuento" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCustomer.discounts.map((discount) => (
                          <SelectItem
                            key={discount}
                            value={discount.toString()}
                          >
                            {discount}%
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-4">
                      <Label htmlFor="custom-discount">
                        Solicitar descuento personalizado:
                      </Label>
                      <div className="flex items-center mt-2">
                        <Input
                          id="custom-discount"
                          type="number"
                          min="0"
                          max="100"
                          value={customDiscountPercentage}
                          onChange={(e) =>
                            setCustomDiscountPercentage(e.target.value)
                          }
                          className="w-20 mr-2"
                        />
                        <span className="mr-2">%</span>
                        <Button
                          onClick={requestCustomDiscount}
                          disabled={
                            customDiscountRequested || !customDiscountPercentage
                          }
                        >
                          Solicitar
                        </Button>
                      </div>
                    </div>
                    {customDiscountRequested && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Solicitud de descuento del {customDiscountPercentage}%
                        enviada al administrador
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Notas de Pedido</h2>
                <Textarea
                  placeholder="Añadir notas al pedido..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </CardContent>
            </Card>

            <Button
              className="w-full"
              onClick={() => setShowConfirmModal(true)}
              disabled={cart.length === 0}
            >
              Confirmar Venta
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Venta</DialogTitle>
            <DialogDescription>
              <p className="m-2">
                Por favor, revise los detalles de la venta antes de confirmar.
                Está acción no se puede revertir
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h3 className="font-semibold mb-2">Resumen de la Venta:</h3>
            <ul className="list-disc list-inside">
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.quantity}x Q{item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="font-semibold mt-2">Total: Q{calculateTotal()}</p>
            {selectedCustomer && (
              <p className="mt-2">Cliente: {selectedCustomer.name}</p>
            )}
            {selectedDiscount && (
              <p className="mt-2">Descuento aplicado: {selectedDiscount}%</p>
            )}
            {orderNotes && (
              <div className="mt-2">
                <p className="font-semibold">Notas:</p>
                <p>{orderNotes}</p>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                // Aquí iría la lógica para procesar la venta
                setShowConfirmModal(false);
                // Resetear el estado después de la venta
                setCart([]);
                setSelectedCustomer(null);
                setSelectedDiscount(null);
                setOrderNotes("");
                setCustomDiscountRequested(false);
                setCustomDiscountPercentage("");
              }}
            >
              Confirmar Venta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
