/*
  Warnings:

  - Added the required column `fecha` to the `Asistencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asistencia" ADD COLUMN     "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL;
