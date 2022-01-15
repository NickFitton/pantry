import { Ingredient } from "@prisma/client";
import { DbService } from "./DbService";

export class IngredientService extends DbService {
  public createIngredient(data: Ingredient): Promise<Ingredient> {
    return this.prismaClient.ingredient.create({ data });
  }

  public getIngredientsByQuery = (query?: string): Promise<Ingredient[]> => {
    if (!query) {
      return this.prismaClient.ingredient.findMany({
        include: {
          _count: true,
        },
      });
    }
    return this.prismaClient.ingredient.findMany({
      include: {
        _count: true,
      },
      where: {
        OR: [
          {
            name: {
              mode: "insensitive",
              contains: query,
            },
          },
          {
            plural: {
              mode: "insensitive",
              contains: query,
            },
          },
        ],
      },
    });
  };

  public getIngredientById(id: string): Promise<Ingredient | null> {
    return this.prismaClient.ingredient.findFirst({ where: { id } });
  }

  public updateIngredientById(
    data: Partial<Ingredient>,
    id: string
  ): Promise<Ingredient | null> {
    return this.prismaClient.ingredient.update({ where: { id }, data });
  }

  public deleteIngredientById(id: string): Promise<Ingredient | null> {
    return this.prismaClient.ingredient.delete({ where: { id } });
  }
}
