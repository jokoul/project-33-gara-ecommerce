import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils.js";
import expressAsyncHandler from "express-async-handler";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user), //we will use token to create authenticated request to update user info
        });
        return; //to stop the script here we are not going to continue writing code after sending data from db
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  }) //by using expressAsyncHandler fn retrieve from "npm i express-async-handler", we can catch error inside async fn and send it to the error handler middleware define in server.js
);

export default userRouter;
