import { Static, Type } from "@sinclair/typebox";

const ResponseUserDto = Type.Object({
  id: Type.String({ format: "uuid" }),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: "email" }),
  created_at: Type.String({ format: "date-time" }),
  updated_at: Type.String({ format: "date-time" }),
});

const RequestUserDto = Type.Object({
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: "email" }),
  password: Type.String(),
});

export type ResponseUserDto = Static<typeof ResponseUserDto>;
export type RequestUserDto = Static<typeof RequestUserDto>;
