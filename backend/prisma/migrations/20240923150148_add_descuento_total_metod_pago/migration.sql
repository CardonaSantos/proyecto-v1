/*
  Warnings:

  - Added the required column `metodoPago` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montoConDescuento` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('CONTADO', 'TARJETA', 'TRANSFERENCIA_BANCO');

-- AlterTable
ALTER TABLE "Venta" ADD COLUMN     "metodoPago" "MetodoPago" NOT NULL,
ADD COLUMN     "montoConDescuento" DOUBLE PRECISION NOT NULL;
