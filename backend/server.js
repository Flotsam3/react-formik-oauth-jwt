import express from "express";
import connectDB from "./libs/dbConnect.js";
import passport from "./auth/index.js";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";

connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true, origin:"http://localhost:5173"}));

app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});
