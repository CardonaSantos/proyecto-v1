/*
  Warnings:

  - You are about to drop the column `costo` on the `Stock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "costo";

-- CreateTable
CREATE TABLE "EntregaStock" (
    "id" SERIAL NOT NULL,
    "proveedorId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntregaStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntregaStockProducto" (
    "id" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "entregaStockId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EntregaStockProducto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EntregaStock" ADD CONSTRAINT "EntregaStock_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntregaStockProducto" ADD CONSTRAINT "EntregaStockProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntregaStockProducto" ADD CONSTRAINT "EntregaStockProducto_entregaStockId_fkey" FOREIGN KEY ("entregaStockId") REFERENCES "EntregaStock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
