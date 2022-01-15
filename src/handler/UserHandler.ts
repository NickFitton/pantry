import { PrismaClient, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { hash } from "bcrypt";
import { FastifyInstance } from "fastify";
import { RequestUserDto, ResponseUserDto } from "../api/UserDto";
import { getPrismaClient } from "../utils/prismaUtils";

const loadEndpoints = (fastify: FastifyInstance) => {
  fastify.post<{ Body: RequestUserDto }>("/users", async ({ body }, reply) => {
    const pHash = hash(body.password, 10);

    const { id } = await getPrismaClient().user.create({
      data: {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        p_hash: await pHash,
      },
    });
    reply.status(201).header("location", `/users/${id}`).send(undefined);
  });

  fastify.get<{ Reply: ResponseUserDto }>(
    "/users/:id",
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const user = await getPrismaClient().user.findFirst({ where: { id } });
      if (!user) {
        reply.callNotFound();
        return;
      }

      const userDto: ResponseUserDto = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        created_at: user.created_at.toUTCString(),
        updated_at: user.updated_at.toUTCString(),
      };
      reply.status(200).send(userDto);
    }
  );

  fastify.patch<{ Body: Partial<User> }>(
    "/users/:id",
    async (request, reply) => {
      const { id } = request.params as { id: string };
      try {
        const response = await getPrismaClient().user.update({
          where: { id },
          data: request.body,
        });
        reply.status(202).send(response);
      } catch (error: unknown) {
        console.log(error);
        if (error instanceof PrismaClientKnownRequestError) {
          reply.callNotFound();
        } else {
          reply.status(500);
          throw error;
        }
      }
    }
  );
};

export { loadEndpoints };
