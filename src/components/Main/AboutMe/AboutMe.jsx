import "./AboutMe.css"
import {Link} from "react-router-dom";
import photo from "../../../images/photo.png"

export function AboutMe() {
  return (
    <section className="about" id="about-me">
      <div className="about__container">
        <h2 className="about__title">Студент</h2>
        <div className="about__wrap">
          <div className="about__info">
            <h3 className="about__name">Виталий</h3>
            <p className="about__job">Фронтенд-разработчик, 30 лет</p>
            <p className="about__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами и ушёл с постоянной работы.</p>
            <Link to="https://github.com/EkaterinaLoshakova" className="about__github link-hover"
                  target="_blank">Github</Link>
          </div>
          <img src={photo} className="about__photo" alt="Студент"/>
        </div>
      </div>
    </section>
  )
}