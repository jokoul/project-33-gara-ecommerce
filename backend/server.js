import express from "express";
import data from "./data.js";

//we create server app
const app = express();

//middleware get to send an anwser if this endpoint is hit by frontend app
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
//middleware get to send an anwser if this endpoint is hit by frontend app
app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((item) => item.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});
//middleware get to send an anwser if this endpoint is hit by frontend app
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((item) => item._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

//define port
const port = process.env.PORT || 5000; //use free port if available or use port 5000

//to make server listening request
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
