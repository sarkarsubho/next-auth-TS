import nodemailer from "nodemailer";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";

// sending mail function

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // created ahashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6b075d8dc60cf6",
        pass: "a76b63d2026f59",
        // TODO: can add this credentials to .env file
      },
    });

    const mailOption = {
      from: "sarkarsubho0905@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.domain
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.domain
      }/verifyemail?token=${hashedToken}
      </p>`,
    };
    const mailResponse = await transport.sendMail(mailOption);

    return mailResponse;

  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
