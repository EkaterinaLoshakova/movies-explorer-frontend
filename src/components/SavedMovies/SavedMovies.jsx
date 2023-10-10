import "./SavedMovies.css"
import {Header} from "../Header/Header";
import {SearchForm} from "../SearchForm/SearchForm";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";
import {Footer} from "../Footer/Footer";
import useSearchForm from "../../hooks/useForm";
import {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import {mainApi} from "../../utils/MainApi";
import {EMPTY_SEARCH, MOVIES_LIST, NETWORK_ERROR} from "../../utils/constants";
import {filterByCheckbox, filterMovies} from "../../utils/movies";
import {Popup} from "../Popup/Popup";

export function SavedMovies({cardsAmount, beatMoviesList, setBeatMoviesList, setSavedList, savedList}) {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const {input, setInput, isShort, setIsShort, handleChange, handleCheckboxChange} = useSearchForm();

  function updateCardList(card) {
    const updatedCardList = cardList.filter((movie) => (movie['_id'] !== card['_id']));
    const updatedSavedList = savedList.filter((movie) => (movie['_id'] !== card['_id']));
    const updatedBeatMoviesList = beatMoviesList.map((movie) => {
      if (movie.id === card.movieId) {
        movie.saved = false
        return movie
      } else {
        return movie
      }
    });
    setCardList(updatedCardList);
    setSavedList(updatedSavedList);
    setBeatMoviesList(updatedBeatMoviesList);
    const moviesList = localStorage.getItem(MOVIES_LIST);
    if (moviesList) {
      const updatedMoviesList = JSON.parse(moviesList).map((movie) => {
        if (movie.id === card.movieId) {
          movie.saved = false
          return movie
        } else {
          return movie
        }
      })
      localStorage.setItem(MOVIES_LIST, JSON.stringify(updatedMoviesList));
    }
  }

  function deleteMovie(card) {
    return mainApi.deleteMovie(card["_id"])
      .then(() => {
        updateCardList(card);
        if (savedList.length === 1) {
          setIsEmptySearch(true);
          setTimeout(() => setIsEmptySearch(false), 5000);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsNetworkError(true);
        setTimeout(() => setIsNetworkError(false), 5000);
      })
  }

  function searchFilms(input, isShort) {
    setInput(input);
    setIsShort(isShort);
    const result = filterMovies(input, isShort, savedList);
    if (!result.length) {
      setIsEmptySearch(true);
      setTimeout(() => setIsEmptySearch(false), 5000);
    }
    setCardList(result);
  }

  function handleCheckbox(e, input) {
    handleCheckboxChange(e);
    const isShort = e.target.checked;
    const result = input ? filterMovies(input, isShort, savedList) : filterByCheckbox(isShort, savedList)
    if (!result.length) {
      setIsEmptySearch(true);
      setTimeout(() => setIsEmptySearch(false), 5000);
    }
    setCardList(result);
  }

  useEffect(() => {
    if (!savedList.length) {
      setLoading(true);
      mainApi.getMovies()
        .then((movies) => {
          setCardList(movies);
          setSavedList(movies);
        })
        .catch(error => {
          console.log(error)
          setIsNetworkError(true);
          setTimeout(() => setIsNetworkError(false), 5000);
        })
        .finally(() => setLoading(false));
    } else {
      setCardList(savedList);
    }

  }, [])

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
          onCheckboxChange={handleCheckbox}
        />
        {loading ? <Preloader/> : cardList && <MoviesCardList
          cards={cardList.slice(0, cardsAmount.init)}
          onDelete={deleteMovie}
        />}
      </main>
      <Footer/>
    </>
  )
}