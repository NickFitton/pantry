import { RecipeBook } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { getUserId } from "../service/AuthService";
import { BookService } from "../service/BookService";

const loadEndpoints = (fastify: FastifyInstance) => {
  const bookService = new BookService();
  fastify.route<{ Body: RecipeBook }>({
    method: "POST",
    url: "/books",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const userId = await getUserId(request);
      const bookId = await bookService.createRecipeBook(userId, request.body);
      reply.status(202).header("location", `/books/${bookId}`).send(undefined);
    },
  });

  fastify.route<{ Reply: RecipeBook[] }>({
    method: "GET",
    url: "/books",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const userId = await getUserId(request);
      reply.status(200).send(await bookService.getRecipeBooksByUserId(userId));
    },
  });

  fastify.route<{ Reply: RecipeBook }>({
    method: "GET",
    url: "/books/:id",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const userId = await getUserId(request);
      const { id: bookId } = request.params as { id: string };
      const book = await bookService.getRecipeBookByUserIdAndRecipeBookId(
        userId,
        bookId
      );
      if (!book) {
        reply.callNotFound();
        return;
      }
      reply.status(200).send(book);
    },
  });

  fastify.route<{ Body: Partial<RecipeBook>; Reply: RecipeBook }>({
    method: "PATCH",
    url: "/books/:id",
    preHandler: fastify.auth([fastify.verifyBearerAuth!]),
    handler: async (request, reply) => {
      const userId = await getUserId(request);
      const { id } = request.params as { id: string };
      const updatedBook = await bookService.updateRecipeBookByUserIdAndId(
        request.body,
        userId,
        id
      );
      if (!updatedBook) {
        reply.callNotFound();
        return;
      }
      reply.status(202).send(updatedBook);
    },
  });
};

export { loadEndpoints };
