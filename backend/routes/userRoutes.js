import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken, isAuth } from "../Utils.js";
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

//middleware to create new user with information coming from form signup
userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save(); //save in db
    //return new User to the frontend app
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.put("/profile", isAuth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8); //we hash password with a salt number of 8
    }
    //save change make on retrieved user
    const updatedUser = await user.save();
    //send back response to frontend
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser), //utils fn to genrate token by encrypting user info inside
    });
  } else {
    res.status(404).send({ message: "User Not Found !" });
  }
});

export default userRouter;
