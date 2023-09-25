import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="logo link-hover">
      <img src={logo} alt="Лого" className="logo__img"/>
    </Link>
  )
}