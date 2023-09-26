import "./MoviesCard.css"
import {useLocation} from "react-router-dom";

export function MoviesCard({card}) {
  const path = useLocation();

  function calculateDuration(duration) {
    const h = Math.floor(duration / 60);
    const m = Math.floor(duration % 60);
    return `${h > 0 ? h + 'ч' : ''}${m}м`;
  }

  return (
    <li className="card">
      <img src={card.image} alt="Фильм" className="card__image"/>
      <div className="card__title-container">
        <h2 className="card__title">{card.nameRu}</h2>
        {path.pathname === "/saved-movies" ?
          <button type="button" className="card__button card__button_delete button-hover"/> :
          card.saved ?
            <button type="button" className="card__button card__button_liked button-hover"/> :
            <button type="button" className="card__button button-hover"/>}
      </div>
      <p className="card__duration">{calculateDuration(card.duration)}</p>
    </li>
  )
}