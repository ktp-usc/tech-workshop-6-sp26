/*
  Warnings:

  - Added the required column `person` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "person" TEXT NOT NULL;
