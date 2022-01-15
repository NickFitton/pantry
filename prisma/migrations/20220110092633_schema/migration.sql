-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_book_id_fkey";

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "book_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "RecipeBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;
