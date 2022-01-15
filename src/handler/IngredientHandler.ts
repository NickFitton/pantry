import { Ingredient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { getUserId } from "../service/AuthService";
import { IngredientService } from "../service/IngredientService";

const loadEndpoints = (fastify: FastifyInstance) => {
  const ingredientService = new IngredientService();
  fastify.route<{
    Body: Ingredient | Ingredient[];
    Reply: Ingredient | Ingredient[];
  }>({
    method: "POST",
    url: "/ingredients",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      if (Array.isArray(request.body)) {
        const ingredients = await Promise.all(
          request.body.map((ingredient) =>
            ingredientService.createIngredient(ingredient)
          )
        );
        reply.status(202).send(ingredients);
        return;
      } else {
        const ingredient = await ingredientService.createIngredient(
          request.body
        );
        reply.status(202).send(ingredient);
        return;
      }
    },
  });

  fastify.route<{ Reply: Ingredient[] }>({
    method: "GET",
    url: "/ingredients",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const query = (request.params as { query?: string })?.query;
      reply
        .status(200)
        .send(await ingredientService.getIngredientsByQuery(query));
    },
  });

  fastify.route<{ Reply: Ingredient }>({
    method: "GET",
    url: "/ingredients/:id",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const ingredient = await ingredientService.getIngredientById(id);
      if (!ingredient) {
        reply.callNotFound();
        return;
      }
      reply.status(200).send(ingredient);
    },
  });

  fastify.route<{ Body: Partial<Ingredient>; Reply: Ingredient }>({
    method: "PATCH",
    url: "/ingredients/:id",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const updatedBook = await ingredientService.updateIngredientById(
        request.body,
        id
      );
      if (!updatedBook) {
        reply.callNotFound();
        return;
      }
      reply.status(202).send(updatedBook);
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/ingredients/:id",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const deleted = await ingredientService.deleteIngredientById(id);
      if (!deleted) {
        reply.callNotFound();
      } else {
        reply.status(201).send();
      }
    },
  });
};

export { loadEndpoints };
