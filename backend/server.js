import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

//call config method to fetch all Environment Variable define in .env
dotenv.config();

//connection to mongodb database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connection to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

//we create server app
const app = express();

//configuration middleware
app.use(express.json()); //change all request content-type from json string to javascript object
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);

//middleware get to send an anwser if this endpoint is hit by frontend app
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });
app.use("/api/products", productRouter);

//middleware to manage user request
app.use("/api/users", userRouter);

//Middleware to Define an error handler thanks this package "express-async-handler"
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message }); //500 means server error
});

//define port
const port = process.env.PORT || 5000; //use free port if available or use port 5000

//to make server listening request
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
