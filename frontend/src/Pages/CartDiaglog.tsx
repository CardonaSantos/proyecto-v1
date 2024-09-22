import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../components/ui/dialog";
import { ShoppingCartIcon, XIcon } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

// Carrito de compras en un Dialog
const CartDialog = ({
  cart,
  removeFromCart,
  updateQuantity,
  calculateTotal,
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" className="fixed bottom-4 right-4">
        <ShoppingCartIcon className="w-6 h-6" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Carrito de Compras</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[300px]">
        {cart.length === 0 ? (
          <p className="text-muted-foreground">El carrito está vacío</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center">
                <p className="font-semibold">{item.nombre}</p>
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
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="w-16 mr-2"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
      <DialogFooter className="flex justify-between">
        <p className="font-semibold">Total:</p>
        <p className="font-semibold">Q{calculateTotal()}</p>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default CartDialog;
