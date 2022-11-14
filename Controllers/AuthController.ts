import { Request, Response } from "express";
import { compare, hashSync } from "bcrypt";
import User from "../Models/UserModel";
import { Document } from "mongoose";
import { auth } from "firebase-admin";
import { generateAuthToken } from "../Middlewares/AuthToken";
import {
  IdTokenMissingError,
  IncorrectPasswordError,
  InternalServerError,
  UserDoesNotExistError,
  UserExistsError,
} from "./Errors";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export const signUpWithEmailAndPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password, dateOfBirth } = req.body;

    const user: Document | null = await User.findOne({ email });
    if (user) {
      return res.status(400).json(UserExistsError);
    }

    const passwordHash = hashSync(password, 10);

    const newUser: Document = await User.create({
      name,
      dateOfBirth,
      email,
      password: passwordHash,
    });

    const authToken = generateAuthToken(newUser._id);
    const responseUser = await User.findById(newUser._id).select("-password");

    res.json({ success: true, user: responseUser, authToken });
  } catch (error) {
    return res.status(500).json(InternalServerError);
  }
};

export const loginWithEmailAndPassword = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  const user: (Document & { password: string }) | null = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json(UserDoesNotExistError);
  }

  const passwordMatches: boolean = await compare(password, user.password);

  if (!passwordMatches) {
    return res.status(400).json(IncorrectPasswordError);
  }

  const authToken = generateAuthToken(user._id);
  const responseUser = await User.findById(user._id).select("-password");

  return res.json({
    success: true,
    user: responseUser,
    authToken,
  });
};

export const loginWithProvider = async (req: Request, res: Response) => {
  const { idToken, dateOfBirth } = req.body;
  if (!idToken) {
    return res.status(404).json(IdTokenMissingError);
  }

  try {
    const decodedData: DecodedIdToken = await auth().verifyIdToken(idToken);
    const userExists: Document | null = await User.findOne({
      email: decodedData.email,
    });

    let response = {
      success: true,
      user: {},
      authToken: "",
    };

    if (userExists) {
      response.user = userExists;
      response.authToken = generateAuthToken(userExists._id);
    } else {
      const user: Document = await User.create({
        email: decodedData.email,
        dateOfBirth,
        name: decodedData.name,
      });
      response.user = user;
      response.authToken = generateAuthToken(user._id);
    }

    res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError);
  }
};
