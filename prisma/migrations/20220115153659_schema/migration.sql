/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `RecipeBook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `RecipeBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecipeBook" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RecipeBook_user_id_key" ON "RecipeBook"("user_id");

-- AddForeignKey
ALTER TABLE "RecipeBook" ADD CONSTRAINT "RecipeBook_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
