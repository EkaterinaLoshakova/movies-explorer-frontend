import "./Movies.css"
import {Header} from "../Header/Header";
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList";
import {Footer} from "../Footer/Footer";
import {useEffect, useState} from "react";
import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";
import {addSaved, filterMovies, Movie} from "../../utils/movies";
import Preloader from "./Preloader/Preloader";
import {EMPTY_SEARCH, IS_SHORT, MOVIES_LIST, NETWORK_ERROR, SEARCH} from "../../utils/constants";
import useSearchForm from "../../hooks/useForm";
import {Popup} from "../Popup/Popup";

export function Movies({cardsAmount, beatMoviesList, setBeatMoviesList}) {
  const [cardList, setCardList] = useState([]);
  const [isMorePresent, setIsMorePresent] = useState(false);
  const [cardsCounter, setCardsCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const {input, setInput, isShort, setIsShort, handleChange, handleCheckboxChange} = useSearchForm();


  function handleMore() {
    const newCardsCounter = cardsCounter + cardsAmount.more;
    if (cardList.length > newCardsCounter) {
      setIsMorePresent(true);
      setCardsCounter(newCardsCounter);
    } else if (cardList.length > cardsCounter) {
      setIsMorePresent(false);
      setCardsCounter(newCardsCounter);
    } else {
      setIsMorePresent(false);
    }
  }

  function handleMovies(input, isShort, movies) {
    setInput(input);
    localStorage.setItem(SEARCH, JSON.stringify(input))
    setIsShort(isShort);
    localStorage.setItem(IS_SHORT, JSON.stringify(isShort))
    const result = filterMovies(input, isShort, movies)
    if (!result.length) {
      setIsEmptySearch(true);
      setTimeout(() => setIsEmptySearch(false), 5000);
    }
    setCardList(result);
    localStorage.setItem(MOVIES_LIST, JSON.stringify(result))
    setIsMorePresent(result.length > cardsAmount.init)
  }

  async function searchFilms(input, isShort) {
    if (!beatMoviesList.length) {
      setLoading(true);
      try {
        const movies = await moviesApi.getBeatMovies();
        const savedMovies = await mainApi.getMovies();
        const updatedMovies = addSaved(movies, savedMovies)
        setBeatMoviesList(updatedMovies)
        handleMovies(input, isShort, updatedMovies);
      } catch (error) {
        console.log(error);
        setIsNetworkError(true);
        setTimeout(() => setIsNetworkError(false), 5000);
      } finally {
        setLoading(false);
      }
    } else {
      handleMovies(input, isShort, beatMoviesList)
    }
  }

  function updateCardList(card) {
    const moviesList = localStorage.getItem(MOVIES_LIST);
    if (moviesList) {
      const updatedMoviesList = JSON.parse(moviesList).map((movie) => (movie.id === card.id) ? card : movie);
      setCardList(updatedMoviesList);
      localStorage.setItem(MOVIES_LIST, JSON.stringify(updatedMoviesList));
    }
    setBeatMoviesList(beatMoviesList.map((movie) => (movie.id === card.id) ? card : movie))
  }

  function likeMovie(card) {
    return mainApi.postMovie(new Movie(card))
      .then((data) => {
        card.saved = true;
        card.savedMovieId = data["_id"];
        updateCardList(card);
      })
      .catch((error) => {
        console.log(error);
        setIsNetworkError(true);
        setTimeout(() => setIsNetworkError(false), 5000);
      })
  }

  function dislikeMovie(card) {
    return mainApi.deleteMovie(card.savedMovieId)
      .then((data) => {
        card.saved = false;
        updateCardList(card);
      })
      .catch((error) => {
        console.log(error);
        setIsNetworkError(true);
        setTimeout(() => setIsNetworkError(false), 5000);
      })
  }

  useEffect(() => {
    setCardsCounter(cardsAmount.init)
    const search = localStorage.getItem(SEARCH);
    const isShort = localStorage.getItem(IS_SHORT);
    const moviesList = localStorage.getItem(MOVIES_LIST);
    if (search && isShort && moviesList) {
      handleMovies(JSON.parse(search), JSON.parse(isShort), JSON.parse(moviesList));
    }
  }, [cardsAmount.init])

  return (
    <>
      <Header/>
      <main className="movies">
        {isEmptySearch && <Popup message={EMPTY_SEARCH} severity="Error"/>}
        {isNetworkError && <Popup message={NETWORK_ERROR} severity="Error"/>}
        <SearchForm
          onSearch={searchFilms}
          input={input}
          isShort={isShort}
          onChange={handleChange}
          onCheckboxChange={handleCheckboxChange}
        />
        {loading ? <Preloader/> : cardList && <MoviesCardList
          cards={cardList.slice(0, cardsCounter)}
          onLike={likeMovie}
          onDislike={dislikeMovie}
        />}
        {isMorePresent ?
          <button type="button" onClick={handleMore} className="movies-button-more button-hover">Ещё</button> : null}
      </main>
      <Footer/>
    </>
  )
}