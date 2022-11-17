import { sign } from "jsonwebtoken";
import { config } from "dotenv";
config();
const JWT_SECRET_KEY = process.env.JWT_SECRET as string;

export const generateAuthToken = (payload: Object): string => {
  const authToken: string = sign(payload, JWT_SECRET_KEY);
  return authToken;
};
