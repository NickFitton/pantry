-- DropForeignKey
ALTER TABLE "PantryIngredients" DROP CONSTRAINT "PantryIngredients_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "PantryIngredients" DROP CONSTRAINT "PantryIngredients_pantry_id_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_book_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeBook" DROP CONSTRAINT "RecipeBook_user_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredients" DROP CONSTRAINT "RecipeIngredients_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredients" DROP CONSTRAINT "RecipeIngredients_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeUsers" DROP CONSTRAINT "RecipeUsers_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeUsers" DROP CONSTRAINT "RecipeUsers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPantry" DROP CONSTRAINT "UserPantry_pantry_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPantry" DROP CONSTRAINT "UserPantry_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "RecipeBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeBook" ADD CONSTRAINT "RecipeBook_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeUsers" ADD CONSTRAINT "RecipeUsers_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeUsers" ADD CONSTRAINT "RecipeUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredients" ADD CONSTRAINT "RecipeIngredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredients" ADD CONSTRAINT "RecipeIngredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPantry" ADD CONSTRAINT "UserPantry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPantry" ADD CONSTRAINT "UserPantry_pantry_id_fkey" FOREIGN KEY ("pantry_id") REFERENCES "Pantry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantryIngredients" ADD CONSTRAINT "PantryIngredients_pantry_id_fkey" FOREIGN KEY ("pantry_id") REFERENCES "Pantry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantryIngredients" ADD CONSTRAINT "PantryIngredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
