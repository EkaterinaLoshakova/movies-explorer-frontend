import "./Movies.css"
import {Header} from "../Header/Header";
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList";
import {Footer} from "../Footer/Footer";
import {cardList} from "../../utils/cards";
import {useEffect, useState} from "react";

export function Movies({cardsAmount}) {
  const [isMorePresent, setIsMorePresent] = useState(false);
  const [cardsCounter, setCardsCounter] = useState(0);
  const cardListLength = cardList.length;

  function handleMore() {
    const newCardsCounter = cardsCounter + cardsAmount.more;
    setIsMorePresent(cardListLength > cardsCounter);
    if (cardsCounter < cardListLength) {
      if (newCardsCounter <= cardListLength) {
        setCardsCounter(newCardsCounter);
      } else {
        setCardsCounter(cardListLength);
        setIsMorePresent(false);
      }
    }
  }

  useEffect(() => {
    if (cardListLength > cardsAmount.init) {
      setIsMorePresent(true)
    }
    setCardsCounter(cardsAmount.init)
  }, [cardListLength, cardsAmount.init])

  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm/>
        <MoviesCardList cards={cardList.slice(0, cardsCounter)}/>
        {isMorePresent ? <button type="button" onClick={handleMore} className="movies-button-more button-hover">Ещё</button> : null}
      </main>
      <Footer/>
    </>
  )
}