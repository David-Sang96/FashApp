import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model";
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
        const email = profile.emails?.[0].value;

        if (!email) return done(null, false);

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            emailVerified: true,
            provider: "google",
          });
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

export default passport;
