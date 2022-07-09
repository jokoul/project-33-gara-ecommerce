import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../Utils";

export default function SignupScreen() {
  const navigate = useNavigate();
  //search is import from the hooks useLocation that allow to get the current location object
  const { search } = useLocation();
  //we get redirectInUrl from the "search" object
  const redirectInUrl = new URLSearchParams(search).get("redirect"); //the value of redirectInUrl here is gonna be '/shipping'
  const redirect = redirectInUrl ? redirectInUrl : "/";
  //define state with useState hooks to store emai and password pull from db through request
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  //Get userInfo from state and state from Store thanks to context hooks
  const { userInfo } = state;

  //define submitHandler
  const submitHandler = async (e) => {
    e.preventDefault(); //to prevent default bahaviour of form like reloading current page

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return; //to stop the script here and don't continue the read the code below
    }
    try {
      const { data } = await axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      //we dispatch an action by defining type and a payload which correspond to the data send to our store
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      // console.log(data)
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      // console.log(err.message);
      // alert("Invalid Email or Password ");
      toast.error(getError(err));
    }
  };

  //Define useEffect to avoid multiple sigin when we are already singin
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  //redirect variable pass in route parameter have as value 'shipping' in this case
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account ?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </div>
      </Form>
    </Container>
  );
}
