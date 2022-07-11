import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import CheckoutSteps from "../components/CheckoutSteps/CheckoutSteps.js";
import { Store } from "../Store.js";
import { useNavigate } from "react-router-dom";

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  //for the logic part, we get state from the context store
  const { state, dispatch: ctxDispatch } = useContext(Store);
  //get cart from the state
  const {
    cart: { shippingAddress, paymentMethod }, //get shippingAddress, paymentMethod from cart
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "Paypal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]); //we define all the variable we use in the function as part of the dependency array

  const submitHandler = (e) => {
    e.preventDefault();
    //we dispatch an other new action with the name and the data we want to store in global state
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName); //Here we don't use JSON.stringify() because the variable contain a simple string not a complex type like object or array
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Paypal"
              label="Paypal"
              value="Paypal"
              checked={paymentMethodName === "Paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
