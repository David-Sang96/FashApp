import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model";
import { uploadOne } from "./cloudinary";
import { ENV_VARS } from "./envVars";

passport.use(
  new GoogleStrategy(
    {
      clientID: ENV_VARS.GOOGLE_CLIENT_ID!,
      clientSecret: ENV_VARS.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(null, false);

        let user = await User.findOne({ email });

        if (user) {
          // Case 1: local user → block Google login
          if (user.provider === "local") {
            return done(null, false, {
              message: "Email already registered with password",
            });
          }

          // Case 2: existing Google user → allow login
          return done(null, user);
        }

        const googleAvatar = profile.photos?.[0]?.value;

        let avatar: { image_url?: string; public_id?: string } = {
          image_url: googleAvatar,
          public_id: undefined,
        };

        if (googleAvatar) {
          const uploaded = await uploadOne(googleAvatar, "users");
          avatar = {
            image_url: uploaded.image_url,
            public_id: uploaded.public_id,
          };
        }

        // Case 3: new user → create Google user
        user = await User.create({
          name: profile.displayName,
          email,
          emailVerified: true,
          provider: "google",
          avatar,
        });

        return done(null, user);
      } catch (err) {
        console.error(err);
        return done(err, false);
      }
    },
  ),
);

export default passport;
