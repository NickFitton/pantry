import { Recipe, RecipeIngredients } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { getUserId } from "../service/AuthService";
import { RecipeService } from "../service/RecipeService";

const loadEndpoints = (fastify: FastifyInstance) => {
  const recipeService = new RecipeService();
  fastify.route<{ Body: { recipe: Recipe; ingredients: RecipeIngredients[] } }>(
    {
      method: "POST",
      url: "/recipes",
      preHandler: fastify.auth([fastify.verifyBearerAuth!]),
      handler: async (request, reply) => {
        const recipe = request.body;
        const userId = await getUserId(request);
        const recipeId = await recipeService.createRecipe(
          userId,
          request.body.recipe,
          request.body.ingredients
        );
        reply
          .status(202)
          .header("location", `/recipes/${recipeId}`)
          .send(undefined);
      },
    }
  );

  fastify.route<{ Reply: Partial<Recipe>[] }>({
    method: "GET",
    url: "/recipes",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const userId = await getUserId(request);
      reply.status(200).send(await recipeService.getRecipesByUserId(userId));
    },
  });

  fastify.route<{ Reply: Recipe }>({
    method: "GET",
    url: "/recipes/:id",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const userId = await getUserId(request);
      const { id: recipeId } = request.params as { id: string };
      const recipe = await recipeService.getRecipeByUserIdAndRecipeId(
        userId,
        recipeId
      );
      if (!recipe) {
        reply.callNotFound();
        return;
      }
      reply.status(200).send(recipe);
    },
  });

  fastify.route<{ Body: Partial<Recipe>; Reply: Recipe }>({
    method: "PATCH",
    url: "/recipes/:id",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const userId = await getUserId(request);
      const { id } = request.params as { id: string };
      const updatedRecipe = await recipeService.updateRecipeByUserIdAndId(
        request.body,
        userId,
        id
      );
      if (!updatedRecipe) {
        reply.callNotFound();
        return;
      }
      reply.status(202).send(updatedRecipe);
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/recipes/:id",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const userId = await getUserId(request);
      const { id } = request.params as { id: string };
      const deleted = await recipeService.deleteRecipe(userId, id);
      if (!deleted) {
        reply.callNotFound();
      } else {
        reply.status(201).send();
      }
    },
  });
};

export { loadEndpoints };
