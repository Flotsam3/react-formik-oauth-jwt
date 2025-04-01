/*
This is used if a user logs in with email and not via google or github
*/
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email" }, 
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "No user found!" });
        }

        const authorized = user.authenticate(password);
        if (!authorized) {
          return done(null, false, { message: "Invalid login data!" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
