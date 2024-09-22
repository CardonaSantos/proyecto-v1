import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import axios from "axios";
import { CategoriaFiltrar } from "../Utils/Types/CategoyFilter";
// import { Cliente, Descuento } from "../Utils/Types/CustomersWithDiscount";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  creadoEn: string;
  actualizadoEn: string;
  codigoProducto: string;
  stock: Stock | null;
  categorias: Category[];
}

interface Stock {
  id: number;
  productoId: number;
  cantidad: number;
  proveedorId: number;
  costo: number;
  creadoEn: string;
  actualizadoEn: string;
}

interface Category {
  categoria: Categoria1;
  creadoEn: string;
}

interface Categoria1 {
  actualizadoEn: string;
  id: number;
  nombre: string;
}

interface Cliente {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
  creadoEn: string;
  actualizadoEn: string;
  descuentos: Descuento[];
}

interface Descuento {
  id: number;
  porcentaje: number;
  clienteId: number;
  activo: boolean;
  creadoEn: string;
  actualizadoEn: string;
}

export default function MakeSale() {
  // Estados
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [products, setProducts] = useState<Producto[]>([]);
  const [cart, setCart] = useState<(Producto & { quantity: number })[]>([]); // Agregamos `quantity` al estado del carrito
  const [selectedCustomer, setSelectedCustomer] = useState<Cliente | null>(
    null
  );
  const [selectedDiscount, setSelectedDiscount] = useState<Descuento | null>(
    null
  );
  const [descuento, setDescuento] = useState<string>("");
  const [nota, setNota] = useState<string>("");
  const [customers, setCustomers] = useState<Cliente[]>([]);
  const [categoria, setCategoria] = useState<CategoriaFiltrar[]>([]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  // Obtener productos
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product/");
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("No hay productos disponibles");
      }
    };

    getProducts();
  }, []);

  // Obtener clientes
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/customers/all-customers-with-discount"
        );
        if (response.status === 200) {
          setCustomers(response.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("No se encontraron clientes");
      }
    };

    getCustomers();
  }, []);

  // Obtener clientes
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories/");
        if (response.status === 200) {
          setCategoria(response.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("No se encontraron clientes");
      }
    };

    getCategories();
  }, []);

  console.log(categoria);

  // Funciones de carrito
  const addToCart = (product: Producto) => {
    if (!product.stock || product.stock?.cantidad <= 0) {
      //si es null o no tiene suficiente
      toast.info("Stock insuficiente");
      return;
    }

    const productoExistente = cart.some((prod) => prod.id === product.id);

    if (productoExistente) {
      toast.info("El objeto ya está en el carrito");
      return;
    }

    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    toast.success("Añadido al Carrito");
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.success("Eliminado del Carrito");
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) return; // Evitar cantidades negativas
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calcular total
  const calculateTotalConDescuento = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    );
    const discountPercentage = selectedDiscount
      ? selectedDiscount.porcentaje / 100
      : 0;
    return (subtotal * (1 - discountPercentage)).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    );
    // const discountPercentage = selectedDiscount
    //   ? selectedDiscount.porcentaje / 100
    //   : 0;
    return subtotal;
  };

  // Filtrar productos
  const filteredProducts = products.filter(
    (product) =>
      (searchTerm === "" ||
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.codigoProducto
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "Todas" ||
        product.categorias.some(
          (cat) => cat.categoria.nombre === selectedCategory
        ))
  );

  // Manejar solicitudes de descuento
  const requestCustomDiscount = () => {
    // Lógica para enviar la solicitud al administrador
    setDescuento("");
    setNota("");
    toast.success("Solicitud de descuento enviada");
  };

  console.log(cart);

  const formatoCartData = (cart: (Producto & { quantity: number })[]) => {
    return {
      monto: cart.reduce(
        (total, item) => total + item.precio * item.quantity,
        0
      ), // Sumar el monto total
      descuento: selectedDiscount?.porcentaje, // Ajusta esto según tu lógica
      clienteId: selectedCustomer?.id, // Supongo que esto vendrá de algún lado, ajusta si es necesario
      vendedorId: 17, // También ajusta según tu contexto
      productos: cart.map((item) => ({
        productoId: item.id, // Cambiar 'id' a 'productoId'
        cantidad: item.quantity, // La cantidad de productos
        precio: item.precio, // El precio del producto
      })),
    };
  };

  const clearCart = () => {
    setCart([]); // Asume que estás usando `setCart` para actualizar el carrito
  };
  const sendCartData = async (cart) => {
    const formateado = formatoCartData(cart);

    console.log("La data a enviar es: ", formateado);

    // Verifica que los campos requeridos estén completos
    if (
      !formateado.clienteId ||
      typeof formateado.descuento === "undefined" || // Verifica si existe el descuento
      typeof formateado.monto === "undefined" || // Verifica si existe el monto
      !formateado.productos ||
      !formateado.vendedorId
    ) {
      toast.info("Faltan campos sin llenar");
      return;
    }

    try {
      console.log(formateado);
      const response = await axios.post(
        "http://localhost:3000/sale/",
        formateado
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Venta creada");
        clearCart();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al crear venta");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Hacer venta</h1>
        </header>

        <div className=" md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Filtros de búsqueda y categoría */}
            <Card className="mb-8">
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    type="text"
                    placeholder="Buscar productos por nombre o código"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todas</SelectItem>

                    {categoria &&
                      categoria.map((category) => (
                        <SelectItem value={category.nombre}>
                          {category.nombre}
                        </SelectItem>
                      ))}
                    {/* <SelectItem value="Todas">Todas</SelectItem>
                    <SelectItem value="Camisetas">Camisetas</SelectItem>
                    <SelectItem value="Pantalones">Pantalones</SelectItem>
                    <SelectItem value="Vestidos">Vestidos</SelectItem> */}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <div className="mb-5">
              <Button variant="outline" onClick={() => setShowCartModal(true)}>
                <ShoppingCartIcon className="mr-2" />
                Ver Carrito ({cart.length})
              </Button>

              <Dialog open={showCartModal} onOpenChange={setShowCartModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Carrito de Compras</DialogTitle>
                    <DialogDescription>
                      Estos son los productos que has añadido al carrito.
                    </DialogDescription>
                  </DialogHeader>

                  <ScrollArea className="h-[300px]">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center">
                        El carrito está vacío
                      </p>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between mb-4"
                        >
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{item.nombre}</p>
                            <p>=</p>
                            <p className="text-sm text-muted-foreground">
                              Q{item.precio.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Input
                              type="number"
                              min="1"
                              max={item.stock?.cantidad}
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-16 mr-2"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <XIcon />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </ScrollArea>
                  <DialogFooter className="flex gap-10 justify-between items-center">
                    <div className="space-y-2">
                      <p className="font-semibold ">
                        Total: Q{calculateTotal()}
                      </p>
                      <p className="font-semibold ">
                        Total con descuento: Q{calculateTotalConDescuento()}
                      </p>
                      <p className="font-semibold ">
                        Descuento:{" "}
                        {selectedDiscount
                          ? selectedDiscount?.porcentaje
                          : "Descuento no seleccionado"}
                        %
                      </p>
                      <p className="font-semibold ">
                        Cliente: {selectedCustomer?.nombre}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowCartModal(false)}
                      >
                        Cerrar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => sendCartData(cart)}
                      >
                        Hacer venta
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Resto de tu código (Selección de cliente, notas, etc.) */}
            </div>
            <div className="">
              {/* Selección de Cliente */}
              <Card className="mb-8">
                <CardContent>
                  <h3 className="text-md font-semibold mb-4">
                    Selección de Cliente
                  </h3>
                  <Select
                    value={selectedCustomer?.id?.toString() || ""}
                    onValueChange={(value) => {
                      const foundCustomer = customers.find(
                        (c) => c.id === parseInt(value)
                      );
                      setSelectedCustomer(foundCustomer || null); // Set null if no customer is found
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
                          {customer.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedCustomer && (
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">
                        Descuentos disponibles:
                      </h3>
                      <Select
                        value={selectedDiscount?.id?.toString() || ""}
                        onValueChange={(value) => {
                          const discount = selectedCustomer.descuentos.find(
                            (d) => d.id === parseInt(value)
                          );
                          setSelectedDiscount(discount || null);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar descuento" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCustomer &&
                          selectedCustomer.descuentos.length > 0 ? (
                            selectedCustomer.descuentos.map((discount) => (
                              <SelectItem
                                key={discount.id}
                                value={discount.id.toString()}
                              >
                                {discount.porcentaje}%
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled value="0">
                              No hay descuentos disponibles
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="">
              <Card className="mb-8">
                <CardContent>
                  <h3 className="text-md font-semibold mb-4">
                    Solicitar Descuento
                  </h3>
                  <div className="flex items-center mb-4">
                    <input
                      className="bg-white dark:text-black border rounded-md p-2 w-32 mr-2"
                      type="number"
                      placeholder="Porcentaje"
                      min="0"
                      max="100"
                      value={descuento}
                      onChange={(e) => setDescuento(e.target.value)}
                    />
                    <span className="text-lg">%</span>
                  </div>
                  <Textarea
                    placeholder="Notas sobre la solicitud (opcional)"
                    onChange={(e) => setNota(e.target.value)}
                    className="mb-4"
                    value={nota}
                  />
                  <Button onClick={requestCustomDiscount} className="mt-2">
                    Solicitar Descuento Personalizado
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Productos filtrados */}
            <ScrollArea className="h-[500px]">
              {" "}
              {/* Ajusta la altura según sea necesario */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{product.nombre}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.codigoProducto}
                      </p>
                      <div className="flex flex-wrap gap-2 my-2">
                        {product.categorias.map((cat) => (
                          <Badge key={cat.categoria.id} variant="outline">
                            {cat.categoria.nombre}
                          </Badge>
                        ))}
                      </div>
                      <p className="font-semibold mt-2">
                        Q{product.precio.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Stock:{" "}
                        {product.stock?.cantidad > 0 ? (
                          <Badge key={product.id} variant="outline">
                            {product.stock?.cantidad}
                          </Badge>
                        ) : (
                          <Badge key={product.id} variant="destructive">
                            Fuera de stock
                          </Badge>
                        )}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={product.stock?.cantidad === 0}
                      >
                        Añadir al Carrito
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Carrito de compras */}
        </div>
      </div>

      {/* Modal de confirmación */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Venta</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas confirmar esta venta?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setShowConfirmModal(false);
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
