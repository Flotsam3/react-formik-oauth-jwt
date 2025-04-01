import { Router } from "express";
import passport from "passport";
import * as user from "../controllers/userController.js";
import { generateToken, authenticate } from "../middleware/jwt.js";

const authRouter = Router();

authRouter
    .get("/google", passport.authenticate("google", {scope:  ["profile", "email"]})) // Called from the client on button click
    .get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }))
    .get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
        const token = generateToken({ userId: req.user._id }); 
        res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.redirect("http://localhost:5173/members");
    })
    .get("/github/callback", passport.authenticate("github", { session: false }), (req, res) => {
        const token = generateToken({ userId: req.user._id }); 
        res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.redirect("http://localhost:5173/members"); 
    })
    .get("/me", authenticate, user.me)
    .get("/error", user.errorAuth)
    .get("/sucess", user.successAuth)
    .post("/logout", user.logout)

export default authRouter;