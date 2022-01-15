// ESM
import Fastify from "fastify";
import { loadEndpoints as loadRecipeEndpoints } from "./handler/RecipeHandler";
import { loadEndpoints as loadUserEndpoints } from "./handler/UserHandler";
import { loadEndpoints as loadLoginEndpoints } from "./handler/LoginHandler";
import { loadEndpoints as loadBookEndpoints } from "./handler/BookHandler";
import { loadEndpoints as loadIngredientEndpoints } from "./handler/IngredientHandler";
import dotenv from "dotenv";
import { getPrismaClient } from "./utils/prismaUtils";
import bearerAuthPlugin from "fastify-bearer-auth";
import auth from "fastify-auth";
import { getPublicKey } from "./utils/singletons/publicKey";
import { verifyToken } from "./service/AuthService";
import jwt from "fastify-jwt";
dotenv.config();

const fastify = Fastify({
  logger: true,
});

const start = async () => {
  const asyncSecret: Promise<string> = getPublicKey().then(
    (key) => key.export({ format: "pem", type: "pkcs1" }) as string
  );
  await fastify
    .register(auth)
    .register(bearerAuthPlugin, {
      addHook: false,
      keys: new Set([]),
      auth: verifyToken,
    })
    .register(jwt, { secret: await asyncSecret });

  loadRecipeEndpoints(fastify);
  loadBookEndpoints(fastify);
  loadIngredientEndpoints(fastify);
  loadUserEndpoints(fastify);
  loadLoginEndpoints(fastify);
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    getPrismaClient().$disconnect();
    process.exit(1);
  }
};
start();
