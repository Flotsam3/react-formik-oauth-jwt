import passport from "passport";
import "./passportGoogle.js";
import "./passportGithub.js"; 
import "./passportLocal.js";
import User from "../models/User.js";

// Is called after successful authentication
passport.serializeUser((user, done)=>{
    console.log("Serialized user:", user);
    done(null, user.id);
});

// Is called by passport.session() for subsequent requests while express-session passes the session to it
passport.deserializeUser(async (id, done)=>{
  try {
    const user = await User.findById(id);
    console.log("Deserializing user:", user);
    done(null, user); // makes the user available under req.user
  } catch (err) {
    done(err, null);
  }
});

export default passport;