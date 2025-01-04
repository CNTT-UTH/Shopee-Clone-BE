import nodemailer from "nodemailer";
import { envConfig } from "~/constants/env";
import path from "path";
import fs from "fs";

const verifyEmailTemplate = fs.readFileSync(path.resolve("src/templates/verify-email.html"), "utf8");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: envConfig.SMTP_HOST,
    port: Number(envConfig.SMTP_PORT),
    secure: true,
    auth: {
        user: envConfig.EMAIL_FROM,
        pass: envConfig.MAIL_AUTH_PASS,
    },
});

export const sendVerifyEmail = async (toAddress: string, code: string) => {
    const message = {
        from: `SHOPPEE <${envConfig.EMAIL_FROM}>`,
        to: toAddress,
        subject: "Verify Email ✔",
        html: verifyEmailTemplate.replace("{{CODE}}", `${code}`),
        // text: `Click this link to verify your email: ${envConfig.FRONTEND_URL}/verify-email/${token}`,
    };

    const info = await transporter.sendMail(message);
    console.log("Message sent successfully as %s", info.messageId);
};
