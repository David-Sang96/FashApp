import { Resend } from "resend";
import { ENV_VARS } from "../config/envVars";

const resend = new Resend(ENV_VARS.RESEND_API_KEY);

interface sendVerificationEmail {
  to: string;
  verificationLink: string;
}

export const sendVerificationEmail = async (to: string, token: string) => {
  const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "FashApp <test@resend.dev>", // your verified domain
    to,
    subject: "Verify Your FashApp Account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333;">Welcome to FashApp,</h2>
        <p style="font-size: 16px; color: #555;">Thank you for signing up! Please verify your email to start using your account.</p>

        <a href="${verificationLink}" 
           style="display: inline-block; padding: 12px 24px; margin: 20px 0; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Verify Email
        </a>

        <p style="font-size: 14px; color: #888;">
          This link will expire in 15 minutes.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

        <p style="font-size: 12px; color: #aaa;">
          If you did not create an account, you can safely ignore this email.
        </p>

        <p style="font-size: 12px; color: #aaa;">
          &copy; ${new Date().getFullYear()} FashApp. All rights reserved.
        </p>
      </div>
    `,
    text: `
      Welcome to FashApp,

      Thank you for signing up! Please verify your email to start using your account.

      Verify here: ${verificationLink}

      This link will expire in 15 minutes.

      If you did not create an account, you can safely ignore this email.

      © ${new Date().getFullYear()} FashApp
    `,
  });

  if (error) throw new Error(`Email send error: ${error.message}`);
  return data?.id;
};
