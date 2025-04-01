import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const generateToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN || "1h"});
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

export const authenticate = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(req.cookies);
        
        if (!token) return res.status(401).json({msg:"Nicht autorisiert!"});

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);

        if (!user) return res.status(404).json({msg: "Benutzer nicht gefunden!"});

        req.user = {name:user.name, email:user.email};
        next();
    } catch (error) {
        return res.status(403).json({msg: "Authentifizierung fehlgeschlagen!"});
    }
}