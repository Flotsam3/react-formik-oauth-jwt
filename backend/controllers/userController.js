import User from "../models/User.js";
import { generateToken } from "../middleware/jwt.js";

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({user})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error!"});
    }
}

export const signUp = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error!"});
    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        const authorized = await user.authenticate(password);
        if (!authorized) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        const token = generateToken({ userId: user._id });

        res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

export const me = async (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({ user:req.user });
        } else {
            res.status(401).json({ msg: "Not authenticated!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error!"});
    }
}

export const errorAuth = async (req, res) => {
    try {
        res.status(401).json({msg: "Authentication error!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error!"});
    }
}

export const successAuth = async (req, res) => {
    try {
        res.status(200).json({msg: "Authentication successful!", user: req.user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error!"});
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.json({ msg: "Logged out successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error!"});
    }
}