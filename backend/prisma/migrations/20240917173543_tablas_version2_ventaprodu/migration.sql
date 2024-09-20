/*
  Warnings:

  - You are about to drop the column `producto` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the `_VentasProducto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_VentasProducto" DROP CONSTRAINT "_VentasProducto_A_fkey";

-- DropForeignKey
ALTER TABLE "_VentasProducto" DROP CONSTRAINT "_VentasProducto_B_fkey";

-- AlterTable
ALTER TABLE "Venta" DROP COLUMN "producto";

-- DropTable
DROP TABLE "_VentasProducto";

-- CreateTable
CREATE TABLE "VentaProducto" (
    "id" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VentaProducto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VentaProducto" ADD CONSTRAINT "VentaProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaProducto" ADD CONSTRAINT "VentaProducto_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
