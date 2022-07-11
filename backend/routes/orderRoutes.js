import express from "express";
import expressAsyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";
import { isAuth } from "../Utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth, //this middleware is responsible to fill the user property
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id, //req.user come from isAuth middleware
    });
    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Creates", order });
  })
);

//It important to put this route before the route below "/:id", otherwise the 'mine' route gonna be handle by "/:id" route
orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }); //ew search order based on user filter. Always "req.user" come from isAuth middleware
    res.send(orders);
  })
);

orderRouter.get(
  "/:id",
  isAuth, //this middleware is responsible to fill the user property
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
