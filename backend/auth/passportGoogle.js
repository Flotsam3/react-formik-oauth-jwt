import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import User from '../models/User.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    accessType: "offline",
    prompt: "consent"
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("google profile", profile);
    
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      console.log({user});
      if (!user) {
        console.log("creating new user");
        
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0]?.value || null,
          profileImage: profile.photos[0]?.value || null,
        });
      }

      return done(null, user);
    } catch (err) {
      console.error("Error during authentication", err);
      return done(err, null);
    }
  }
));