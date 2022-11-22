import { IncorrectOtpError, OtpExpiredError } from "../Constants/Errors";
import OtpModel from "../Models/OtpModel";
import { generateAuthToken } from "./generateAuthToken";

export default function verifyOtp(
  otp: string,
  email: string
): Promise<string | Object> {
  return new Promise(async (resolve, reject) => {
    const otpExists = await OtpModel.findOne({ otp });
    if (!otpExists || otpExists.email != email) {
      return reject(IncorrectOtpError);
    }
    if (Date.now() > otpExists.expiry) {
      return reject(OtpExpiredError);
    }

    await OtpModel.deleteOne({ otp });

    const emailToken: string = generateAuthToken({ email });

    resolve(emailToken);
  });
}
