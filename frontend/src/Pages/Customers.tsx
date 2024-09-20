import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import axios from "axios";
import { Clientes } from "../Utils/Types/Customers";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState<Clientes | null>();

  async function getCustomers() {
    try {
      const response = await axios.get("http://localhost:3000/customers/");
      if (response.status === 200) {
        setCustomers(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.info("No se encontraron clientes");
    }
  }

  useEffect(() => {
    getCustomers();
  }, []);

  console.log(customers);

  return (
    <div className=" bg-gray-100 dark:bg-gray-900">
      <Card>
        <CardHeader>
          <CardTitle>Administrar Clientes</CardTitle>
          <CardDescription>Ver y editar clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Telefono</TableHead>

                <TableHead>Dirección</TableHead>

                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers &&
                customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.nombre}</TableCell>
                    <TableCell>{customer.correo}</TableCell>
                    <TableCell>{customer.telefono}</TableCell>
                    <TableCell>{customer.direccion}</TableCell>

                    <TableCell>
                      <Link to={`/compras-cliente/${customer.id}`}>
                        <Button variant="outline" size="sm">
                          Compras
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Customers;
