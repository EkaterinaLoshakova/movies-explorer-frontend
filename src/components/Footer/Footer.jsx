import "./Footer.css"
import {Link} from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__info">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__bottom">
          <p className="footer__copyright">© 2020</p>
          <nav className="footer__nav">
            <Link to="https://practicum.yandex.ru" target="_blank" className="footer__link link-hover">
              Яндекс.Практикум</Link>
            <Link to="https://github.com/EkaterinaLoshakova" target="_blank" className="footer__link link-hover">
              Github</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}