import "./SavedMovies.css"
import {Header} from "../Header/Header";
import {SearchForm} from "../Movies/SearchForm/SearchForm";
import {cardList} from "../../utils/cards";
import {MoviesCardList} from "../Movies/MoviesCardList/MoviesCardList";
import {Footer} from "../Footer/Footer";

export function SavedMovies({cardsAmount}) {
  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm/>
        <MoviesCardList cards={cardList.slice(0, cardsAmount.saved)}/>
      </main>
      <Footer/>
      </>
  )
}