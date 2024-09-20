"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Search, Calendar } from "lucide-react";

import { format } from "date-fns";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  code: string;
  currentStock: number;
  averageCost: number;
  providers: string[];
};

type FormData = {
  productId: string;
  quantity: number;
  unitCost: number;
  provider: string;
  receptionDate: Date;
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta Básica",
    code: "CB001",
    currentStock: 100,
    averageCost: 10,
    providers: ["Proveedor A", "Proveedor B"],
  },
  {
    id: "2",
    name: "Pantalón Vaquero",
    code: "PV002",
    currentStock: 50,
    averageCost: 25,
    providers: ["Proveedor B", "Proveedor C"],
  },
  {
    id: "3",
    name: "Vestido de Verano",
    code: "VV003",
    currentStock: 75,
    averageCost: 20,
    providers: ["Proveedor A", "Proveedor C"],
  },
];

const providers = ["Proveedor A", "Proveedor B", "Proveedor C", "Proveedor D"];

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [newAverageCost, setNewAverageCost] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const watchQuantity = watch("quantity");
  const watchUnitCost = watch("unitCost");

  useEffect(() => {
    if (selectedProduct && watchQuantity && watchUnitCost) {
      const totalCurrentValue =
        selectedProduct.currentStock * selectedProduct.averageCost;
      const totalNewValue = watchQuantity * watchUnitCost;
      const newTotalStock = selectedProduct.currentStock + watchQuantity;
      const newAvgCost = (totalCurrentValue + totalNewValue) / newTotalStock;
      setNewAverageCost(Number(newAvgCost.toFixed(2)));
    }
  }, [selectedProduct, watchQuantity, watchUnitCost]);

  useEffect(() => {
    const filtered = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const onSubmit = (data: FormData) => {
    // Aquí iría la lógica para guardar el stock en la base de datos
    console.log(data);
    // toast.success({
    //     title: "Stock agregado",
    //     description: `Se han agregado ${data.quantity} unidades al producto ${selectedProduct?.name}. Nuevo costo promedio: $${newAverageCost}`,
    //   })
    toast.success(
      `Se han agregado ${data.quantity} unidades al producto ${selectedProduct?.name}. Nuevo costo promedio: $${newAverageCost}`
    );
    reset();
    setSelectedProduct(null);
  };

  const handleCancel = () => {
    reset();
    setSelectedProduct(null);
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
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Código: {product.code}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Columna central: Formulario para agregar stock */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="quantity">Cantidad recibida</Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity", {
                  required: "Este campo es requerido",
                  min: 1,
                })}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="unitCost">Costo por unidad</Label>
              <Input
                id="unitCost"
                type="number"
                step="0.01"
                {...register("unitCost", {
                  required: "Este campo es requerido",
                  min: 0,
                })}
              />
              {errors.unitCost && (
                <p className="text-red-500 text-sm">
                  {errors.unitCost.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="provider">Proveedor</Label>
              <Controller
                name="provider"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem key={provider} value={provider}>
                          {provider}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.provider && (
                <p className="text-red-500 text-sm">
                  {errors.provider.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="receptionDate">Fecha de recepción</Label>
              <Controller
                name="receptionDate"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <Popover>
                    <Input
                      className="bg-slate-900 text-white"
                      type="date"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </Popover>
                )}
              />
              {errors.receptionDate && (
                <p className="text-red-500 text-sm">
                  {errors.receptionDate.message}
                </p>
              )}
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={!selectedProduct}>
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
              <h3 className="font-bold">{selectedProduct.name}</h3>
              <p className="text-sm text-gray-500">
                Código: {selectedProduct.code}
              </p>
              <p className="mt-2">
                Stock actual: {selectedProduct.currentStock}
              </p>
              <p>Costo promedio: ${selectedProduct.averageCost.toFixed(2)}</p>
              <p className="mt-2">Proveedores anteriores:</p>
              <ul className="list-disc list-inside">
                {selectedProduct.providers.map((provider, index) => (
                  <li key={index}>{provider}</li>
                ))}
              </ul>
              {watchQuantity && watchUnitCost && (
                <div className="mt-4 p-2 bg-muted rounded-md">
                  <p className="font-semibold">Resumen de cambios:</p>
                  <p>
                    Nuevo stock:{" "}
                    {selectedProduct.currentStock + Number(watchQuantity)}
                  </p>
                  <p>Nuevo costo promedio: ${newAverageCost}</p>
                </div>
              )}
            </div>
          ) : (
            <p>Selecciona un producto para ver su información.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// export default StockPage
