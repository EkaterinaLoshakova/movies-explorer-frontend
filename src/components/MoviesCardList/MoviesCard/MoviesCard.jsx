import "./MoviesCard.css"
import {useLocation} from "react-router-dom";
import {BEAT_FILMS_URL} from "../../../utils/constants";

export function MoviesCard({card, onLike, onDislike, onDelete}) {
  const path = useLocation();

  function calculateDuration(duration) {
    const h = Math.floor(duration / 60);
    const m = Math.floor(duration % 60);
    return `${h > 0 ? h + 'ч' : ''}${m}м`;
  }

  function handleLike() {
    onLike(card);
  }

  function handleDislike() {
    onDislike(card);
  }

  function handleDelete() {
    onDelete(card);
  }

  return (
    <li className="card">
      <img src={path.pathname === "/saved-movies" ? card.image : `${BEAT_FILMS_URL}${card.image.url}`}
           alt="Фильм" className="card__image"
           onClick={() => window.open(card.trailerLink, "_blank", "noreferrer")}/>
      <div className="card__title-container">
        <h2 className="card__title">{card.nameRU}</h2>
        {path.pathname === "/saved-movies" ?
          <button type="button" className="card__button card__button_delete button-hover" onClick={handleDelete}/> :
          card.saved ?
            <button type="button" className="card__button card__button_liked button-hover" onClick={handleDislike}/> :
            <button type="button" className="card__button button-hover" onClick={handleLike}/>}
      </div>
      <p className="card__duration">{calculateDuration(card.duration)}</p>
    </li>
  )
}