import { Resend } from "resend";
import { ENV_VARS } from "../config/envVars";

export const resend = new Resend(ENV_VARS.RESEND_API_KEY);

interface sendVerificationEmail {
  to: string;
  verificationLink: string;
}

export const sendVerificationEmail = async (to: string, token: string) => {
  const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "FashApp <test@resend.dev>",
    to,
    subject: "Verify Your FashApp Account ✨",
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
                    <div style="background-color: rgba(255, 255, 255, 0.15); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; line-height: 80px; text-align: center;">
                      <span style="font-size: 48px;">👋</span>
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                      Welcome to FashApp!
                    </h1>
                    <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.95); font-size: 16px;">
                      You're one step away from getting started
                    </p>
                  </td>
                </tr>
                
                <!-- Main content -->
                <tr>
                  <td style="padding: 48px 40px;">
                    <p style="margin: 0 0 24px; color: #0f172a; font-size: 18px; line-height: 1.6; font-weight: 600;">
                      Hi there! 🎉
                    </p>
                    
                    <p style="margin: 0 0 24px; color: #475569; font-size: 16px; line-height: 1.6;">
                      Thank you for signing up! We're excited to have you on board. To get started and unlock all the amazing features, please verify your email address by clicking the button below:
                    </p>
                    
                    <!-- CTA Button -->
                    <table role="presentation" style="width: 100%; margin: 32px 0;">
                      <tr>
                        <td align="center">
                          <a href="${verificationLink}" 
                             style="display: inline-block; 
                                    padding: 18px 56px; 
                                    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                                    color: #ffffff; 
                                    text-decoration: none; 
                                    border-radius: 8px; 
                                    font-weight: 700; 
                                    font-size: 17px;
                                    letter-spacing: 0.3px;
                                    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
                                    transition: all 0.3s ease;">
                            ✨ Verify My Email
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Features Preview -->
                    <table role="presentation" style="width: 100%; margin: 32px 0; background: linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%); border-radius: 10px; padding: 24px;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 16px; color: #0f172a; font-size: 15px; font-weight: 600;">
                            What you'll get access to:
                          </p>
                          <table role="presentation" style="width: 100%;">
                            <tr>
                              <td style="padding: 8px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                                ✓ <strong style="color: #0f172a;">Personalized</strong> fashion recommendations
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                                ✓ <strong style="color: #0f172a;">Exclusive</strong> deals and early access
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                                ✓ <strong style="color: #0f172a;">Save</strong> your favorite items
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                                ✓ <strong style="color: #0f172a;">Track</strong> your orders seamlessly
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Expiration notice -->
                    <table role="presentation" style="width: 100%; margin: 24px 0; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                            ⏱️ <strong>Quick reminder:</strong> This verification link expires in <strong>15 minutes</strong>.
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Alternative link -->
                    <p style="margin: 24px 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                      If the button doesn't work, copy and paste this link into your browser:
                    </p>
                    <p style="margin: 8px 0 0; word-break: break-all;">
                      <a href="${verificationLink}" style="color: #6366f1; text-decoration: none; font-size: 13px;">
                        ${verificationLink}
                      </a>
                    </p>
                  </td>
                </tr>
                
                <!-- Help section -->
                <tr>
                  <td style="padding: 0 40px 48px;">
                    <table role="presentation" style="width: 100%; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0 0 12px; color: #0f172a; font-size: 14px; font-weight: 600;">
                            🤔 Didn't sign up?
                          </p>
                          <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.5;">
                            If you didn't create a FashApp account, you can safely ignore this email. No further action is needed, and your email won't be used without verification.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 32px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                    <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                      <tr>
                        <td align="center">
                          <p style="margin: 0 0 8px; color: #0f172a; font-size: 18px; font-weight: 700;">
                            FashApp
                          </p>
                          <p style="margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.5;">
                            Making fashion accessible for everyone
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <table role="presentation" style="width: 100%; margin-top: 16px;">
                      <tr>
                        <td align="center">
                          <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                            © ${new Date().getFullYear()} FashApp. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
              </table>
              
              <!-- Outside footer note -->
              <p style="margin: 24px 0 0; color: #94a3b8; font-size: 12px; text-align: center; max-width: 500px;">
                You're receiving this email because you signed up for a FashApp account.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `
Welcome to FashApp! 👋

Hi there,

Thank you for signing up! We're excited to have you on board.

To get started and unlock all the amazing features, please verify your email address by clicking the link below:

${verificationLink}

What you'll get access to:
✓ Personalized fashion recommendations
✓ Exclusive deals and early access
✓ Save your favorite items
✓ Track your orders seamlessly

⏱️ Quick reminder: This verification link expires in 15 minutes.

Didn't sign up?
If you didn't create a FashApp account, you can safely ignore this email. No further action is needed.

© ${new Date().getFullYear()} FashApp - Making fashion accessible for everyone

You're receiving this email because you signed up for a FashApp account.
    `,
  });

  if (error) throw new Error(`Email send error: ${error.message}`);
  return data?.id;
};
