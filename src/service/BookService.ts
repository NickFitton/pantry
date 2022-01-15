import { RecipeBook } from "@prisma/client";
import { DbService } from "./DbService";

export class BookService extends DbService {
  public async createRecipeBook(
    userId: string,
    recipe: RecipeBook
  ): Promise<string> {
    const createdRecipeBook = await this.prismaClient.recipeBook.create({
      data: { ...recipe, user_id: userId },
    });

    return createdRecipeBook.id;
  }

  public getRecipeBooksByUserId = (userId: string): Promise<RecipeBook[]> => {
    return this.prismaClient.recipeBook.findMany({
      where: { user_id: userId },
    });
  };

  public async getRecipeBookByUserIdAndRecipeBookId(
    userId: string,
    recipeId: string
  ): Promise<RecipeBook | null> {
    return this.prismaClient.recipeBook.findFirst({
      where: { user_id: userId, id: recipeId },
    });
  }

  public async updateRecipeBookByUserIdAndId(
    recipe: Partial<RecipeBook>,
    userId: string,
    recipeId: string
  ): Promise<RecipeBook | null> {
    if (!(await this.userCanUpdate(userId, recipeId))) {
      return null;
    }
    return this.prismaClient.recipeBook.update({
      where: { id: recipeId },
      data: recipe,
    });
  }

  private async userCanUpdate(userId: string, id: string): Promise<boolean> {
    const count = await this.prismaClient.recipeBook.count({
      where: { user_id: userId, id },
    });
    return count > 0;
  }
}
