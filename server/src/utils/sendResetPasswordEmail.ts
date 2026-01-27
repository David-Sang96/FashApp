import { resend } from "../config/resend";
import { AppError } from "./AppError";

export const sendResetPasswordEmail = async (
  to: string,
  token: string,
): Promise<string> => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "FashApp <no-reply@davidsang.dev>",
      to,
      subject: "Reset your FashApp password",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f9fb; font-family: 'Albert Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fb;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">
                
                <!-- Header with primary color -->
                <tr>
                  <td style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 48px 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                      🔐 Password Reset
                    </h1>
                  </td>
                </tr>
                
                <!-- Main content -->
                <tr>
                  <td style="padding: 30px 15px;">
                    <p style="margin: 0 0 24px; color: #0f172a; font-size: 16px; line-height: 1.6;">
                      Hi there,
                    </p>
                    
                    <p style="margin: 0 0 24px; color: #475569; font-size: 16px; line-height: 1.6;">
                      We received a request to reset your password for your <strong style="color: #0f172a;">FashApp</strong> account. Click the button below to create a new password:
                    </p>
                    
                    <!-- CTA Button -->
                    <table role="presentation" style="width: 100%; margin: 32px 0;">
                      <tr>
                        <td align="center">
                          <a href="${resetLink}" 
                             style="display: inline-block; 
                                    padding: 16px 20px; 
                                    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                                    color: #ffffff; 
                                    text-decoration: none; 
                                    border-radius: 8px; 
                                    font-weight: 600; 
                                    font-size: 16px;
                                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
                                    transition: all 0.3s ease;">
                            Reset My Password
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Expiration notice -->
                    <table role="presentation" style="width: 100%; margin: 24px 0; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                            ⏱️ <strong>Important:</strong> This link will expire in <strong>15 minutes</strong> for security reasons.
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Alternative link -->
                    <p style="margin: 24px 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                      If the button doesn't work, copy and paste this link into your browser:
                    </p>
                    <p style="margin: 8px 0 0; word-break: break-all;">
                      <a href="${resetLink}" style="color: #6366f1; text-decoration: none; font-size: 13px;">
                        ${resetLink}
                      </a>
                    </p>
                  </td>
                </tr>
                
                <!-- Security notice -->
                <tr>
                  <td style="padding: 0 40px 48px;">
                    <table role="presentation" style="width: 100%; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0 0 12px; color: #0f172a; font-size: 14px; font-weight: 600;">
                            🛡️ Security Notice
                          </p>
                          <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.5;">
                            If you didn't request a password reset, please ignore this email or contact our support team if you have concerns about your account security.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 32px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 12px; color: #0f172a; font-size: 16px; font-weight: 600; text-align: center;">
                      FashApp
                    </p>
                    <p style="margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.5; text-align: center;">
                      Making fashion accessible for everyone
                    </p>
                    <p style="margin: 16px 0 0; color: #94a3b8; font-size: 12px; text-align: center;">
                      © ${new Date().getFullYear()} FashApp. All rights reserved.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
      text: `Reset your FashApp password

Hi there,

We received a request to reset your password. Click the link below to create a new password:

${resetLink}

This link will expire in 15 minutes for security reasons.

If you didn't request a password reset, please ignore this email or contact our support team.

- FashApp Team
    `,
    });

    if (error) throw new Error(`Email send error: ${error.message}`);

    if (!data?.id) {
      throw new Error("Resend did not return an email id");
    }

    return data?.id;
  } catch (err) {
    console.error("Resend sendResetPasswordEmail failed: ", err);
    throw new AppError("Failed to send reset password email");
  }
};
