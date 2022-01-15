-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "method" TEXT[],
    "genres" TEXT[],
    "book_id" TEXT NOT NULL,
    "prep_time_minutes" INTEGER NOT NULL,
    "cook_time_minutes" INTEGER NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeBook" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genres" TEXT NOT NULL,

    CONSTRAINT "RecipeBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plural" TEXT NOT NULL,
    "default_measure" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pantry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pantry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeUsers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,

    CONSTRAINT "RecipeUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredients" (
    "id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "ingredient_id" TEXT NOT NULL,
    "measure" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "group" TEXT NOT NULL DEFAULT E'default',

    CONSTRAINT "RecipeIngredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPantry" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "pantry_id" TEXT NOT NULL,

    CONSTRAINT "UserPantry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PantryIngredients" (
    "id" TEXT NOT NULL,
    "pantry_id" TEXT NOT NULL,
    "ingredient_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "measure" TEXT NOT NULL,

    CONSTRAINT "PantryIngredients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "RecipeBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeUsers" ADD CONSTRAINT "RecipeUsers_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeUsers" ADD CONSTRAINT "RecipeUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredients" ADD CONSTRAINT "RecipeIngredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredients" ADD CONSTRAINT "RecipeIngredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPantry" ADD CONSTRAINT "UserPantry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPantry" ADD CONSTRAINT "UserPantry_pantry_id_fkey" FOREIGN KEY ("pantry_id") REFERENCES "Pantry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantryIngredients" ADD CONSTRAINT "PantryIngredients_pantry_id_fkey" FOREIGN KEY ("pantry_id") REFERENCES "Pantry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantryIngredients" ADD CONSTRAINT "PantryIngredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
