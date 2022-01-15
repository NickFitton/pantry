import { Recipe, RecipeIngredients } from "@prisma/client";
import { DbService } from "./DbService";

export class RecipeService extends DbService {
  public async createRecipe(
    userId: string,
    recipe: Recipe,
    ingredients: RecipeIngredients[]
  ): Promise<string> {
    const createdRecipe = await this.prismaClient.recipe.create({
      data: {
        ...recipe,
        recipe_users: {
          create: { user_id: userId },
        },
        recipe_ingredients: {
          createMany: { data: ingredients },
        },
      },
    });

    return createdRecipe.id;
  }

  public getRecipesByUserId = (userId: string): Promise<Partial<Recipe>[]> => {
    return this.prismaClient.recipe.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        genres: true,
        book: {
          select: {
            id: true,
            name: true,
            author: true,
          },
        },
      },
      where: { recipe_users: { some: { user_id: userId } } },
    });
  };

  public async getRecipeByUserIdAndRecipeId(
    userId: string,
    recipeId: string
  ): Promise<Recipe | null> {
    return this.prismaClient.recipe.findFirst({
      include: {
        recipe_ingredients: {
          include: {
            ingredient: true,
          },
        },
        book: {
          select: {
            id: true,
            name: true,
            author: true,
          },
        },
      },
      where: { recipe_users: { some: { user_id: userId } }, id: recipeId },
    });
  }

  public async updateRecipeByUserIdAndId(
    recipe: Partial<Recipe>,
    userId: string,
    recipeId: string
  ): Promise<Recipe | null> {
    if (!(await this.userCanUpdate(userId, recipeId))) {
      return null;
    }
    return this.prismaClient.recipe.update({
      where: { id: recipeId },
      data: recipe,
    });
  }

  public async deleteRecipe(
    userId: string,
    id: string
  ): Promise<Recipe | null> {
    const canDelete = await this.userCanUpdate(userId, id);
    if (!canDelete) {
      return null;
    }
    return this.prismaClient.recipe.delete({ where: { id } });
  }

  private async userCanUpdate(userId: string, id: string): Promise<boolean> {
    const count = await this.prismaClient.recipe.count({
      where: { recipe_users: { some: { user_id: userId } }, id },
    });
    return count > 0;
  }
}
