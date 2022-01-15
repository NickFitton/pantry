import { Static, Type } from "@sinclair/typebox";

const AccessTokenDto = Type.Object({
  access_token: Type.String(),
  token_type: Type.String(),
  expires_in: Type.String(),
});

export type AccessTokenDto = Static<typeof AccessTokenDto>;
