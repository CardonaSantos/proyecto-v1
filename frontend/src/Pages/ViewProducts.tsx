import { useEffect, useState } from "react";
import { Search, Filter, Edit, Trash2, Plus, X } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Link } from "react-router-dom";
import { Product } from "../Utils/Types/Product";
import axios from "axios";
import { toast } from "sonner";

// Mock product data

export default function ViewProducts() {
  const [products, setProducts] = useState<Product[]>([]); // Adjusted type
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    size: "",
    color: "",
    priceRange: [0, 200],
  });

  // Fetch products from API
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

  // Filter products
  const filteredProducts = products.filter(
    (product) =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.precio >= filters.priceRange[0] &&
      product.precio <= filters.priceRange[1]
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Gestión de productos</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar producto por nombre..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" /> Filtros
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-8 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Categoría</Label>
              <select
                className="w-full mt-1 p-2 border rounded"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="">Todas las Categorías</option>
                <option value="Camisetas">Camisetas</option>
                <option value="Suéteres">Suéteres</option>
                <option value="Chaquetas">Chaquetas</option>
                <option value="Shorts">Shorts</option>
                <option value="Vestidos">Vestidos</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>
            <div>
              <Label>Rango de Precio</Label>
              <Slider
                min={0}
                max={200}
                step={10}
                value={filters.priceRange}
                onValueChange={(value) =>
                  setFilters({ ...filters, priceRange: value })
                }
                className="mt-2"
              />
              <div className="flex justify-between mt-2">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.nombre}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Código: {product.codigoProducto}
                </p>
                <p className="text-gray-600 mb-2">
                  Precio Venta: Q{product.precio.toFixed(2)}
                </p>
                <div>
                  {product.categorias.map((prod, index) => (
                    <Badge key={index} className="mt-2">
                      {prod.categoria.nombre}
                    </Badge>
                  ))}
                </div>
                <Badge
                  variant={
                    product.stock && product.stock.cantidad > 0
                      ? "outline"
                      : "destructive"
                  }
                  className="mt-2"
                >
                  {product.stock && product.stock.cantidad > 0
                    ? `En Stock (${product.stock.cantidad})`
                    : "Fuera de Stock (0)"}
                </Badge>
              </CardContent>
              <CardFooter className=" p-4 flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProduct(product)}
                >
                  Ver Detalles
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>

      {/* Pagination can be added here */}

      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.nombre}</DialogTitle>
          </DialogHeader>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DialogClose>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700">Código producto</Label>
                <Input
                  value={selectedProduct?.codigoProducto}
                  readOnly
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <Label className="text-gray-700">Categoría</Label>
                <Input
                  value={selectedProduct?.categorias
                    .map((cat) => cat.categoria.nombre)
                    .join(", ")}
                  readOnly
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <Label className="text-gray-700">Precio</Label>
                <Input
                  value={`Q${selectedProduct?.precio.toFixed(2)}`}
                  readOnly
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <Label className="text-gray-700">Stock actual</Label>
                <Input
                  value={selectedProduct?.stock?.cantidad || 0}
                  readOnly
                  type="number"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <Label className="text-gray-700">Descripción</Label>
                <textarea
                  className="w-full p-2 border rounded bg-white text-gray-700"
                  rows={3}
                  defaultValue={
                    selectedProduct?.descripcion || "Sin descripción"
                  }
                  readOnly
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Link to={"/crear-productos"}>
        <Button
          className="fixed bottom-4 right-4 rounded-full shadow-lg"
          size="lg"
        >
          <Plus className="mr-2" />
          Crear Producto
        </Button>
      </Link>
    </div>
  );
}
