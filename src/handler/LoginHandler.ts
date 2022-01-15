import { FastifyInstance } from "fastify";
import { AccessTokenDto } from "../api/AccessTokenDto";
import { authenticate } from "../service/AuthService";

const loadEndpoints = (fastify: FastifyInstance) => {
  fastify.post<{ Reply: AccessTokenDto }>(
    "/auth/login",
    async ({ headers: { authorization } }, reply) => {
      const [username, password] = getCredentialsFromHeader(authorization);
      const authToken = await authenticate(username, password);
      if (!authToken) {
        throw { message: "Invalid Credentials", code: 401 };
      }
      reply.status(200).send(authToken);
    }
  );
};

const getCredentialsFromHeader = (
  authorizationHeader?: string
): [string, string] => {
  const base64Credentials = authorizationHeader?.split(" ")[1];
  if (!base64Credentials) {
    throw { message: "Must supply basic credentials to login", code: 400 };
  }
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");
  if (!username || !password) {
    throw { message: "Must supply basic credentials to login", code: 400 };
  }
  return [username, password];
};

export { loadEndpoints };
