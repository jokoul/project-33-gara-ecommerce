import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";

import { Link, useLocation } from "react-router-dom";

export default function SigninScreen() {
  //search is import from the hooks useLocation that allow to get the current location object
  const { search } = useLocation();
  //we get redirectInUrl from the "search" object
  const redirectInUrl = new URLSearchParams(search).get("redirect"); //the value of redirectInUrl here is gonna be '/shipping'
  const redirect = redirectInUrl ? redirectInUrl : "/";

  //redirect variable pass in route parameter have as value 'shipping' in this case
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer ?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}
