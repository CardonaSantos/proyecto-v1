/*
  Warnings:

  - A unique constraint covering the columns `[codigoProducto]` on the table `Producto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigoProducto` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descuento` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "codigoProducto" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Venta" ADD COLUMN     "descuento" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Producto_codigoProducto_key" ON "Producto"("codigoProducto");
