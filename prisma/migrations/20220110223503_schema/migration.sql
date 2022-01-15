/*
  Warnings:

  - Added the required column `p_hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "p_hash" TEXT NOT NULL;
