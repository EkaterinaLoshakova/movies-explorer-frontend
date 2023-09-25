import "./Header.css"
import {useLocation} from "react-router-dom";
import {Logo} from "../Logo/Logo";
import {Navigation} from "../Navigation/Navigation";

export function Header() {
  const path = useLocation();
  return (
    <header className={`header ${path.pathname === '/' ? 'header_theme_landing' : 'header_theme_main'}`}>
      <div className={"header__cont"}>
        <Logo/>
        <Navigation/>
      </div>
    </header>
  )
}