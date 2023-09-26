import "./Anonim.css"
import {useNavigate} from "react-router-dom";

export function Anonim() {
  const navigate = useNavigate();
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li>
          <button className="navigation__button navigation__button_type_register button-hover" type="button" onClick={(e) => navigate("/signup")}>
            Регистрация
          </button>
        </li>
        <li>
          <button className="navigation__button navigation__button_type_login button-hover" type="button" onClick={(e) => navigate("/signin")}>
            Войти
          </button>
        </li>
      </ul>
    </nav>
  )
}