import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export function ProtectedRoute({element: Component, ...props}) {
  const user = useContext(CurrentUserContext);
  return user.isLoggedIn ? <Component {...props} /> : <Navigate to="/" replace/>
}