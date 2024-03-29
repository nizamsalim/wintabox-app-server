import { Request, Response } from "express";
import { compare, hashSync } from "bcrypt";
import User from "../Models/UserModel";
import { Document } from "mongoose";
import { auth } from "firebase-admin";
import { generateAuthToken } from "../Helpers/generateAuthToken";
import {
  EmailNotVerifiedError,
  IdTokenMissingError,
  IncorrectPasswordError,
  InternalServerError,
  InvalidInputError,
  InvalidLoginError,
  UserDoesNotExistError,
  UserExistsError,
} from "../Constants/Errors";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import sendEmailVerificationOtp from "../Helpers/sendEmailVerificationOtp";
import verifyOtp from "../Helpers/verifyOtp";
import { verifyEmailToken } from "../Helpers/verifyEmailToken";

export const signUpWithEmailAndPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password, dateOfBirth } = req.body;

    const passwordHash = hashSync(password, 10);

    const newUser: Document = await User.create({
      name,
      dateOfBirth,
      email,
      password: passwordHash,
    });

    const authToken = generateAuthToken({ _id: newUser._id });
    const responseUser = await User.findById(newUser._id).select("-password");

    res.json({ success: true, user: responseUser, authToken });
  } catch (error) {
    return res.status(500).json(InternalServerError);
  }
};

export const initiateVerifyUserEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json(InvalidInputError).status(400);
    }

    const user: Document | null = await User.findOne({ email });
    if (user) {
      return res.status(400).json(UserExistsError);
    }

    sendEmailVerificationOtp(email)
      .then((success) => {
        if (success) {
          res.status(200).end();
        }
      })
      .catch((err) => {
        return res.status(500).json(InternalServerError);
      });
  } catch (error) {
    return res.status(500).json(InternalServerError);
  }
};

export const verifyUserEmail = async (req: Request, res: Response) => {
  try {
    const { otp, email } = req.body;
    if (!(otp && email)) {
      return res.status(400).json(InvalidInputError);
    }

    verifyOtp(otp, email)
      .then((emailToken) => {
        res.json({ success: true, emailToken });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    return res.status(500).json(InternalServerError);
  }
};

export const loginWithEmailAndPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user: (Document & { password: string }) | null = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json(UserDoesNotExistError);
    }

    if (!user.password) {
      return res.status(400).json(InvalidLoginError);
    }

    const passwordMatches: boolean = await compare(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json(IncorrectPasswordError);
    }

    const authToken = generateAuthToken({ _id: user._id });
    const responseUser = await User.findById(user._id).select("-password");

    return res.json({
      success: true,
      user: responseUser,
      authToken,
    });
  } catch (error) {
    return res.status(500).json(InternalServerError);
  }
};

export const loginWithProvider = async (req: Request, res: Response) => {
  const { dateOfBirth } = req.body;
  const idToken = req.headers["id-token"] as string;
  if (!idToken) {
    return res.status(401).json(IdTokenMissingError);
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
      response.authToken = generateAuthToken({ _id: userExists._id });
    } else {
      const user: Document = await User.create({
        email: decodedData.email,
        dateOfBirth,
        name: decodedData.name,
      });
      response.user = user;
      response.authToken = generateAuthToken({ _id: user._id });
    }

    res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError);
  }
};

export const resetUserPassword = async (req: Request, res: Response) => {
  const emailToken = req.headers["email-token"] as string;
  const { newPassword, email } = req.body;

  if (!emailToken) return res.status(404).json(IdTokenMissingError);
  if (!(newPassword && email)) return res.status(400).json(InvalidInputError);

  const emailIsVerified = verifyEmailToken(email, emailToken, res);

  if (!emailIsVerified) return res.status(401).json(EmailNotVerifiedError);

  const newPasswordHash = hashSync(newPassword, 10);
  User.updateOne(
    { email },
    {
      $set: {
        password: newPasswordHash,
      },
    }
  )
    .then(async (resp) => {
      const responseUser = await User.findOne({ email }).select("-password");
      const authToken = generateAuthToken({ _id: responseUser?._id });

      return res.json({
        success: true,
        user: responseUser,
        authToken,
      });
    })
    .catch((err) => {
      return res.status(500).json(InternalServerError);
    });
};

// email signup & google login --- token pass in header
