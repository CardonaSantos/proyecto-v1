import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { toast } from "sonner";
import { Proveedor } from "../Utils/Types/Proveedor";
import { Categorias } from "../Utils/Types/Category";
import { Checkbox } from "../components/ui/checkbox";

const proveedoresIniciales = ["Proveedor A", "Proveedor B", "Proveedor C"];

export default function CreateProduct() {
  const [providers, setProviders] = useState<Proveedor[]>([]);
  const [categories, setCategories] = useState<Categorias[]>([]);
  const [formData, setFormData] = useState({
    nombre: "",
    codigoProducto: "",
    descripcion: "",
    categoriaIds: [] as number[],
    proveedor: "",
    precio: 0,
    precioVenta: 0,
  });

  const [showNewProveedorDialog, setShowNewProveedorDialog] = useState(false);
  const [newProveedor, setNewProveedor] = useState("");
  const [proveedores, setProveedores] = useState(proveedoresIniciales);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (categoryId: number) => {
    const isSelected = formData.categoriaIds.includes(categoryId);
    const newCategories = isSelected
      ? formData.categoriaIds.filter((id) => id !== categoryId)
      : [...formData.categoriaIds, categoryId];
    setFormData({ ...formData, categoriaIds: newCategories });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/product/",
        formData
      );
      if (response.status === 201) {
        toast.success("Producto creado exitosamente");
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal...");
    }
  };

  const addNewProveedor = () => {
    if (newProveedor) {
      setProveedores([...proveedores, newProveedor]);
      setShowNewProveedorDialog(false);
      setNewProveedor("");
    }
  };

  const getProviders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/provider");
      if (response.status === 200) {
        setProviders(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.info("No se encontraron proveedores");
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories/"); // Cambia esta URL si es necesario
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.info("No se encontraron categorías");
    }
  };

  useEffect(() => {
    getProviders();
    getCategories();
  }, []);

  const getCategoryNames = () => {
    return formData.categoriaIds
      .map((id) => categories.find((cat) => cat.id === id)?.nombre)
      .filter(Boolean) // Eliminar cualquier valor nulo o undefined
      .join(", ");
  };

  console.log(formData);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Producto</h1>
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre del producto</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="codigoProducto">Código del producto</Label>
            <Input
              id="codigoProducto"
              name="codigoProducto"
              value={formData.codigoProducto}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción del producto</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="categoriaIds">Añadir categorías</Label>
            <div className="categories-container">
              {categories.map((categoria) => (
                <div key={categoria.id} className="category-item">
                  <input
                    type="checkbox"
                    id={`cat-${categoria.id}`}
                    name="categoriaIds"
                    value={categoria.id}
                    checked={formData.categoriaIds.includes(categoria.id)}
                    onChange={() => handleCheckboxChange(categoria.id)}
                  />
                  <Label
                    htmlFor={`cat-${categoria.id}`}
                    className="category-label ml-2"
                  >
                    {categoria.nombre}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="proveedor">Proveedor</Label>
            <div className="flex space-x-2">
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, proveedor: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un proveedor" />
                </SelectTrigger>
                <SelectContent>
                  {proveedores.map((prov) => (
                    <SelectItem key={prov} value={prov}>
                      {prov}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog
                open={showNewProveedorDialog}
                onOpenChange={setShowNewProveedorDialog}
              >
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">
                    Nuevo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
                    <DialogDescription>
                      Ingrese el nombre del nuevo proveedor
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    value={newProveedor}
                    onChange={(e) => setNewProveedor(e.target.value)}
                    placeholder="Nombre del proveedor"
                  />
                  <DialogFooter>
                    <Button type="button" onClick={addNewProveedor}>
                      Agregar Proveedor
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div>
            <Label htmlFor="precio">Precio Costo</Label>
            <Input
              id="precio"
              name="precio"
              type="number"
              value={Number(formData.precio)}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="precioVenta">Precio de venta sugerido</Label>
            <Input
              id="precioVenta"
              name="precioVenta"
              type="number"
              value={formData.precioVenta}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex space-x-2">
            <Button type="submit">Crear producto</Button>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </div>
        </form>

        <div className="mt-6 lg:mt-0">
          <h2 className="text-xl font-semibold mb-4">
            Vista Previa del Producto
          </h2>
          <div className="border p-4 rounded-md">
            <h3 className="font-bold">
              {formData.nombre || "Nombre del producto"}
            </h3>
            <p className="text-sm text-gray-500">
              Código: {formData.codigoProducto || "N/A"}
            </p>
            <p className="mt-2">
              {formData.descripcion || "Descripción del producto"}
            </p>
            <p className="mt-2">Categorías: {getCategoryNames() || "N/A"}</p>
            <p>Proveedor: {formData.proveedor || "N/A"}</p>
            <p className="mt-2">Costo base: Q{formData.precio || 0}</p>
            <p>Precio de venta: Q{formData.precioVenta || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}