import { createTransport, Transporter } from "nodemailer";
import OtpModel from "../Models/OtpModel";
import { generate } from "otp-generator";
import { generateAuthToken } from "./generateAuthToken";

export default function sendEmailVerificationOtp(
  email: string
): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const transporter: Transporter = createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_EMAIL_PASSWORD,
        },
      });

      const otp: string = await generateOtp(email);

      transporter.sendMail(
        {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: "Otp for Wintabox App",
          text: `Hello!,\n${otp} is your otp for Wintabox App email verification. This code is valid for 10 minutes.\n\nThank you\nTeam Wintabox`,
        },
        (err, info) => {
          if (err) {
            reject(false);
          } else {
            resolve(true);
          }
        }
      );
    } catch (error) {
      reject(false);
    }
  });
}

async function generateOtp(email: string) {
  const otpExists = await OtpModel.findOne({ email });
  if (otpExists) {
    await OtpModel.deleteOne({ email });
  }
  const expiry: Date = new Date(Date.now() + 60 * 60 * 1000);

  const code = generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });

  const otp = await OtpModel.create({
    otp: code,
    expiry,
    email,
  });

  return code;
}
