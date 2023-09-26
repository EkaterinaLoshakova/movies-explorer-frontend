import "./Navigation.css"
import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Anonim} from "./Anonim/Anonim";
import {NavigationUser} from "./NavigationUser/NavigationUser";

export function Navigation() {
  const user = useContext(CurrentUserContext);

  return (
    <>
      {user.isLoggedIn ? <NavigationUser/> : <Anonim/>}
    </>
  )
}