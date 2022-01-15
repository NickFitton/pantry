/*
  Warnings:

  - A unique constraint covering the columns `[name,plural]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_plural_key" ON "Ingredient"("name", "plural");
