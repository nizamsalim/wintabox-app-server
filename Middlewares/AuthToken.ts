import { sign } from "jsonwebtoken";
const JWT_SECRET_KEY = "abcdefghijklmnopqrstuvwxyz123456789";

export const generateAuthToken = (_id: string): string => {
  const authToken: string = sign(
    {
      _id,
    },
    JWT_SECRET_KEY
  );
  return authToken;
};
