/*
  Warnings:

  - You are about to drop the column `costo` on the `EntregaStockProducto` table. All the data in the column will be lost.
  - You are about to drop the column `costo` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `creadoEn` on the `Stock` table. All the data in the column will be lost.
  - Added the required column `costoUnitario` to the `EntregaStockProducto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoTotal` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EntregaStockProducto" DROP COLUMN "costo",
ADD COLUMN     "costoUnitario" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "costo",
DROP COLUMN "creadoEn",
ADD COLUMN     "costoTotal" DOUBLE PRECISION NOT NULL;
