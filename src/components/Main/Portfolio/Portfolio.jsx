import "./Portfolio.css"
import {Link} from "react-router-dom";

export function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">
          Портфолио
        </h2>
        <ul className="portfolio__list">
          <li className="portfolio__element">
            <Link to="https://github.com/EkaterinaLoshakova/how-to-learn" target="_blank" className="portfolio__link-container link-hover">
              <p className="portfolio__link-name">Статичный сайт</p>
              <p className="portfolio__link-arrow">↗</p>
            </Link>
          </li>
          <li className="portfolio__element">
            <Link to="https://github.com/EkaterinaLoshakova/russian-travel" target="_blank" className="portfolio__link-container link-hover">
              <p className="portfolio__link-name">Адаптивный сайт</p>
              <p className="portfolio__link-arrow">↗</p>
            </Link>
          </li>
          <li className="portfolio__element">
            <Link to="https://github.com/EkaterinaLoshakova/react-mesto-api-full-gha" target="_blank" className="portfolio__link-container link-hover">
              <p className="portfolio__link-name">Одностраничное приложение</p>
              <p className="portfolio__link-arrow">↗</p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}