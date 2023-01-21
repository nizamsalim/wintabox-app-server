import { Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export function verifyEmailToken(
  email: string,
  emailToken: string,
  res: Response
): boolean | undefined {
  try {
    const payload = verify(emailToken, process.env.JWT_SECRET as string) as (
      | string
      | JwtPayload
    ) & { email: string };
    return payload.email == email;
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        code: "auth/emtkn-cr",
        message: "Email token is corrupted",
        statusCode: 400,
      },
    });
  }
}
