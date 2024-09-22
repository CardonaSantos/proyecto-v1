/*
  Warnings:

  - The `estado` column on the `SolicitudDescuento` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('PENDIENTE', 'ACEPTADA', 'RECHAZADA');

-- AlterTable
ALTER TABLE "SolicitudDescuento" DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoSolicitud" NOT NULL DEFAULT 'PENDIENTE';

-- CreateTable
CREATE TABLE "Descuento" (
    "id" SERIAL NOT NULL,
    "porcentaje" DOUBLE PRECISION NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Descuento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Descuento" ADD CONSTRAINT "Descuento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
