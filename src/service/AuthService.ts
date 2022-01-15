import { compare } from "bcrypt";
import { AccessTokenDto } from "../api/AccessTokenDto";
import { getPrismaClient } from "../utils/prismaUtils";
import { jwtVerify, JWTVerifyResult, SignJWT } from "jose";
import { getPrivateKey } from "../utils/singletons/privateKey";
import { getPublicKey } from "../utils/singletons/publicKey";
import { FastifyRequest } from "fastify";
import { Server, IncomingMessage } from "http";

const authenticate = async (
  username: string,
  password: string
): Promise<AccessTokenDto | null> => {
  const user = await getPrismaClient().user.findFirst({
    where: { email: username },
  });
  if (!user) {
    return null;
  }
  const authorized = await compare(password, user.p_hash);
  if (!authorized) {
    return null;
  }
  return {
    access_token: await generateJwt(user.id),
    expires_in: "3600",
    token_type: "jwt",
  };
};

const loadAuthentication = async (
  authorizationHeader: string
): Promise<JWTVerifyResult | null> => {
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return null;
  }
  try {
    return loadToken(token);
  } catch (e) {
    return null;
  }
};

const loadToken = async (token: string): Promise<JWTVerifyResult> =>
  getPublicKey().then((key) => jwtVerify(token, key));

const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const {
      payload: { exp: expiryTime },
    } = await loadToken(token);
    const dateInSeconds = Math.floor(Date.now() / 1000);
    return !!expiryTime && expiryTime > dateInSeconds;
  } catch (e) {
    return false;
  }
};
async function getUserId(
  request: FastifyRequest<any, Server, IncomingMessage, unknown>
) {
  const auth = await loadAuthentication(request.headers.authorization!);
  const sub = auth?.payload?.sub;
  if (!sub) {
    throw {
      message: "Could not load auth token after authentication",
      status: 500,
    };
  }
  return sub;
}

const generateJwt = async (id: string): Promise<string> => {
  const privateKey = getPrivateKey();
  return new SignJWT({ sub: id }) // TODO: Manage scopes
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setIssuer("https://auth.pantry.io/auth/login")
    .setAudience(["https://api.pantry.io"])
    .setExpirationTime("2h")
    .sign(await privateKey);
};

export { authenticate, verifyToken, loadAuthentication, getUserId };
