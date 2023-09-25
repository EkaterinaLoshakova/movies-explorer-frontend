import "./NavigationUser.css"
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";

export function NavigationUser() {
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);

  function handleMenu() {
    setMenuActive((prev) => !prev)
  }

  return (
    <>
      <button type="button" className="header__burger-button button-hover" onClick={handleMenu}/>
      <div className={`header__menu${menuActive ? " header__menu_active" : ""}`}>
        <div className="header__menu-blur" onClick={handleMenu}>
          <div className="header__menu-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="header__close-button button-hover" onClick={handleMenu}/>
            <nav className="navigation-user">
              <ul className="navigation-user__links">
                <li>
                  <NavLink
                    to="/"
                    className={({isActive}) => `navigation-user__link-main navigation-user__link link-hover${isActive ? ' navigation-user__link_active' : ''}`}
                  >Главная</NavLink>
                </li>
                <li>
                  <NavLink
                    to="/movies"
                    className={({isActive}) => `navigation-user__link link-hover${isActive ? ' navigation-user__link_active' : ''}`}
                  >Фильмы</NavLink>
                </li>
                <li>
                  <NavLink
                    to="/saved-movies"
                    className={({isActive}) => `navigation-user__link link-hover${isActive ? ' navigation-user__link_active' : ''}`}
                  >Сохранённые фильмы</NavLink>
                </li>
              </ul>
              <button className="navigation-user__account button-hover" type="button"
                      onClick={(e) => navigate("/profile")}/>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}