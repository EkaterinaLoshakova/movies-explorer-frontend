import "./MoviesCardList.css"
import {MoviesCard} from "../MoviesCard/MoviesCard";

export function MoviesCardList({cards}) {
  return (
    <section className="movies-data" aria-label="фильмы">
      <ul className="movies-data__list">
        {cards.map(card => <MoviesCard key={card['id']} card={card}/>)}
      </ul>
    </section>
  )
}