import "./AboutProject.css"

export function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">
          О проекте
        </h2>
        <ul className="about-project__info">
          <li className="about-project__info-element">
            <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__info-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.</p>
          </li>
          <li className="about-project__info-element">
            <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__info-subtitle">У каждого этапа был мягкий и жёсткий дедлайн,
              которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <ul className="about-project__time">
          <li className="about-project__time-element">
            <h3 className="about-project__time-title about-project__time-title_color_blue">1 неделя</h3>
            <p className="about-project__time-subtitle">Back-end</p>
          </li>
          <li className="about-project__time-element">
            <h3 className="about-project__time-title about-project__time-title_color_grey">4 недели</h3>
            <p className="about-project__time-subtitle">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  )
}