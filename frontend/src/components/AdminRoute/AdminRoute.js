import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../../Store";

export default function AdminRoute({ children }) {
  //we get children from props
  //get userInfo from the context state
  const { state } = useContext(Store);
  const { userInfo } = state;
  //if user is admin the redirect him to protectd section
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}
