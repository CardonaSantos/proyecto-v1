"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog"; // Cambiamos Modal por Dialog
import axios from "axios";
import { toast } from "sonner";

// Tipos actualizados
interface Stock {
  id: number;
  productoId: number;
  cantidad: number;
  proveedorId: number;
  costo: number;
  creadoEn: string;
  actualizadoEn: string;
}

interface Categoria1 {
  actualizadoEn: string;
  id: number;
  nombre: string;
}

interface Category {
  categoria: Categoria1;
  creadoEn: string;
}

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

export type Product = Producto;

const providers = [
  { id: 1, name: "Proveedor A" },
  { id: 2, name: "Proveedor B" },
  { id: 3, name: "Proveedor C" },
  { id: 4, name: "Proveedor D" },
];

export default function StockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [newAverageCost, setNewAverageCost] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [unitCost, setUnitCost] = useState(0);
  const [stockItems, setStockItems] = useState<any[]>([]);

  useEffect(() => {
    if (selectedProduct && quantity && unitCost) {
      const totalCurrentValue =
        (selectedProduct.stock?.cantidad || 0) *
        (selectedProduct.stock?.costo || 0);
      const totalNewValue = quantity * unitCost;
      const newTotalStock = (selectedProduct.stock?.cantidad || 0) + quantity;
      const newAvgCost = (totalCurrentValue + totalNewValue) / newTotalStock;
      setNewAverageCost(Number(newAvgCost.toFixed(2)));
    }
  }, [selectedProduct, quantity, unitCost]);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.codigoProducto.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleAddToStock = () => {
    if (selectedProduct && quantity > 0 && unitCost > 0 && selectedProvider) {
      // Verificar si el producto ya está en el stockItems
      const productExists = stockItems.some(
        (item) => item.productoId === selectedProduct.id
      );

      if (productExists) {
        toast.error("Este producto ya está agregado en el inventario.");
        return; // Salir sin agregar el producto
      }

      const newItem = {
        productoId: selectedProduct.id,
        cantidad: quantity,
        costoUnitario: unitCost,
        proveedorId: selectedProvider,
      };

      setStockItems((prevItems) => [...prevItems, newItem]);
      setSelectedProduct(null); // Limpiar la selección de producto
      setQuantity(0);
      setUnitCost(0);
      toast.success("Producto agregado a la lista de stock.");
    } else {
      toast.error("Por favor, completa todos los campos.");
    }
  };
  console.log(selectedProvider);

  const handleConfirmStock = async () => {
    const stockData = {
      proveedorId: selectedProvider,
      productos: stockItems,
    };

    try {
      const response = await axios.post("http://localhost:3000/stock/", {
        proveedorId: selectedProvider,
        productos: stockItems,
      });
      if (response.status === 201) {
        toast.success("Stock confirmado y enviado al inventario.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al enviar stock");
    }
    console.log("Enviando stock:", stockData);
    // Aquí puedes hacer el envío a la API
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setQuantity(0);
    setUnitCost(0);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/");
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("No hay productos disponibles");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleRemoveFromStock = (productoId: number) => {
    setStockItems((prevItems) =>
      prevItems.filter((item) => item.productoId !== productoId)
    );
    toast.success("Producto eliminado de la lista de stock.");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Asignar Stock a Productos</h1>
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Columna izquierda: Búsqueda y selección de productos */}
        <div className="mb-6 lg:mb-0">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar producto por nombre o código"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mt-4 max-h-96 overflow-y-auto">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-2 border-b cursor-pointer hover:bg-muted"
                onClick={() => setSelectedProduct(product)}
              >
                <p className="font-medium">{product.nombre}</p>
                <p className="text-sm text-muted-foreground">
                  Código: {product.codigoProducto}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Columna central: Formulario para agregar stock */}
        <div>
          <form className="space-y-4">
            <div>
              <Label htmlFor="quantity">Cantidad recibida</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="unitCost">Costo por unidad en este stock</Label>
              <Input
                id="unitCost"
                type="number"
                step="0.01"
                value={unitCost}
                onChange={(e) => setUnitCost(Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="provider">Proveedor</Label>
              <Select
                onValueChange={(value) => setSelectedProvider(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un proveedor" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem
                      key={provider.id}
                      value={provider.id.toString()}
                    >
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={handleAddToStock}
                disabled={!selectedProduct}
              >
                Agregar al inventario
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>

        {/* Columna derecha: Visualización del inventario actual */}
        <div className="mt-6 lg:mt-0">
          <h2 className="text-xl font-semibold mb-4">Inventario Actual</h2>
          {selectedProduct ? (
            <div className="border p-4 rounded-md">
              <h3 className="font-bold">{selectedProduct.nombre}</h3>
              <p className="text-sm text-gray-500">
                Código: {selectedProduct.codigoProducto}
              </p>
              <p className="mt-2">
                Stock actual:{" "}
                {selectedProduct.stock?.cantidad !== undefined
                  ? selectedProduct.stock.cantidad
                  : "Sin stock registrado"}
              </p>
              <p className="mt-2">Categorías:</p>
              <ul className="list-disc list-inside">
                {selectedProduct.categorias.map((cat) => (
                  <li key={cat.categoria.id}>{cat.categoria.nombre}</li>
                ))}
              </ul>
              {quantity > 0 && unitCost > 0 && (
                <div className="mt-4 p-2 bg-muted rounded-md">
                  <p className="font-semibold">Resumen de cambios:</p>
                  <p>
                    Nuevo stock:{" "}
                    {(selectedProduct.stock?.cantidad ?? 0) + Number(quantity)}
                  </p>

                  <p>Nuevo costo de producto en este Stock: Q{unitCost}</p>
                </div>
              )}
            </div>
          ) : (
            <p>Selecciona un producto para ver el inventario</p>
          )}
        </div>
      </div>

      {/* Botón para confirmar todos los cambios */}
      {stockItems.length > 0 && (
        <div className="mt-6 ">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Confirmar y enviar inventario</Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Confirmar Inventario
                </DialogTitle>
                <DialogDescription>
                  Revisa y confirma los productos a enviar al inventario:
                </DialogDescription>
              </DialogHeader>
              <ul className="mb-4 max-h-64 overflow-y-auto">
                {stockItems.map((item, index) => {
                  const product = products.find(
                    (p) => p.id === item.productoId
                  );
                  const provider = providers.find(
                    (p) => p.id === item.proveedorId
                  );

                  return (
                    <li
                      key={index}
                      className="flex justify-between items-center p-4 border-b bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          Producto:
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {product ? product.nombre : `ID: ${item.productoId}`}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          Cantidad:
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {item.cantidad}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          Costo:
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                          Q{item.costoUnitario}
                        </span>
                      </div>
                      <Button
                        variant="destructive"
                        size={"sm"}
                        onClick={() => handleRemoveFromStock(item.productoId)}
                      >
                        <X />
                      </Button>
                    </li>
                  );
                })}
              </ul>

              <div className="mb-4">
                <h2 className="font-semibold">
                  Proveedor:{" "}
                  {stockItems.length > 0 && selectedProvider
                    ? providers.find((p) => p.id === selectedProvider)?.name ||
                      "Sin proveedor"
                    : "Sin proveedor"}
                </h2>

                <h2 className="font-semibold">
                  Cantidad de productos entrantes:{" "}
                  {stockItems.reduce((acc, item) => acc + item.cantidad, 0)}
                </h2>
                <h2 className="font-semibold">
                  Total: Q
                  {stockItems
                    .reduce(
                      (acc, item) => acc + item.cantidad * item.costoUnitario,
                      0
                    )
                    .toFixed(2)}
                </h2>
              </div>
              <DialogFooter>
                <Button onClick={handleConfirmStock}>Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
