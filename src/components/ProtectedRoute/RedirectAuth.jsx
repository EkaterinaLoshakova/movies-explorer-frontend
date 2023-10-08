import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export function RedirectAuth({element: Component, ...props}) {
  const user = useContext(CurrentUserContext);
  return user.isLoggedIn ? <Navigate to="/" replace/>:  <Component {...props} />
}