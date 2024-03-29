import { Request, Response } from "express";
import { verifyEmailToken } from "../Helpers/verifyEmailToken";

import User from "../Models/UserModel";

const validateSignup = async (req: Request, res: Response, next: Function) => {
  const { name, email, password } = req.body;
  const emailToken = req.headers["email-token"] as string;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: {
        statusCode: 400,
        code: "val/inv-inp",
        message: "Invalid input",
      },
    });
  }
  if (!emailToken) {
    return res.status(401).json({
      success: false,
      error: {
        statusCode: 401,
        code: "auth/tkn-abs",
        message: "Email token is missing",
      },
    });
  }
  // validation checks
  const emailExists = await User.findOne({ email: email });
  const emailIsValid = validateEmail(email);
  const passwordIsValid = password.length >= 6 ? true : false;
  const emailIsVerified = verifyEmailToken(email, emailToken, res);

  function validateEmail(emailInput: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailInput.toLowerCase());
  }

  // function validatePhone(phoneInput: string) {
  //   const re = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
  //   return re.test(phoneInput);
  // }

  // if (usernameExists) {
  //   return res.status(400).json({
  //     success: false,
  //     error: {
  //       statusCode: 400,
  //       code: "val/un-tkn",
  //       message: "Username is already taken",
  //     },
  //   });
  // }
  if (emailExists) {
    return res.status(400).json({
      success: false,
      error: {
        statusCode: 400,
        code: "val/em-ex",
        message: "Email already exists",
      },
    });
  }
  if (!emailIsValid) {
    return res.status(400).json({
      success: false,
      error: {
        statusCode: 400,
        code: "val/em-inv",
        message: "Email is invalid",
      },
    });
  }
  if (!passwordIsValid) {
    return res.status(400).json({
      success: false,
      error: {
        statusCode: 400,
        code: "val/pwd-len",
        message: "Password should be atleast 6 characters long",
      },
    });
  }
  if (!emailIsVerified) {
    return res.status(401).json({
      success: false,
      error: {
        statusCode: 401,
        code: "auth/em-nv",
        message: "Email is not verified",
      },
    });
  }
  // if (!phoneIsValid) {
  //   return res.status(400).json({
  //     success: false,
  //     error: {
  //       statusCode: 400,
  //       code: "val/ph-inv",
  //       message: "Phone is in invalid format",
  //     },
  //   });
  // }
  next();
};

export default validateSignup;
