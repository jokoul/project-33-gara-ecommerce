import Alert from "react-bootstrap/Alert";

//{props.children} allow to render the content inside the children of the Alert component.
export default function MessageBox(props) {
  return <Alert variant={props.variant || "info"}>{props.children}</Alert>;
}
