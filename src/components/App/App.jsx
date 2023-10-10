import "./App.css"
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Main} from "../Main/Main";
import {Movies} from "../Movies/Movies";
import {SavedMovies} from "../SavedMovies/SavedMovies";
import {Register} from "../Register/Register";
import {Login} from "../Login/Login";
import {Profile} from "../Profile/Profile";
import {NotFound} from "../NotFound/NotFound";
import {
  LAPTOP_INIT_CARDS,
  LAPTOP_L_INIT_CARDS,
  LAPTOP_L_MORE_CARDS,
  LAPTOP_L_RESOLUTION,
  LAPTOP_MORE_CARDS,
  LAPTOP_RESOLUTION,
  MOBILE_INIT_CARDS,
  MOBILE_MORE_CARDS,
  TABLET_INIT_CARDS,
  TABLET_MORE_CARDS,
  TABLET_RESOLUTION
} from "../../utils/constants";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import {mainApi} from "../../utils/MainApi";
import {RedirectAuth} from "../ProtectedRoute/RedirectAuth";

export function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    isLoggedIn: !!localStorage.getItem("jwt")
  });
  const [cardsAmount, setCardsAmount] = useState({init: 16, more: 4});
  const [beatMoviesList, setBeatMoviesList] = useState([]);
  const [savedList, setSavedList] = useState([]);
  const navigate = useNavigate();


  function handleLoginSubmit(email, password) {
    return mainApi.authorization(email, password)
      .then(({token}) => {
        localStorage.setItem("jwt", token)
        return mainApi.getUserData()
      })
      .then(({name, email}) => {
        setCurrentUser((prev) => ({name: name, email: email, isLoggedIn: true}))
        navigate("/movies", {replace: true});
        return true
      })
  }

  function handleRegisterSubmit(name, email, password) {
    return mainApi.register(name, email, password)
      .then(() => handleLoginSubmit(email, password))
  }

  useEffect(() => {
    const handleScreenResize = () => {
      if (window.innerWidth < TABLET_RESOLUTION) {
        setCardsAmount({init: MOBILE_INIT_CARDS, more: MOBILE_MORE_CARDS});
      } else if (window.innerWidth >= TABLET_RESOLUTION && window.innerWidth < LAPTOP_RESOLUTION) {
        setCardsAmount({init: TABLET_INIT_CARDS, more: TABLET_MORE_CARDS});
      } else if (window.innerWidth >= LAPTOP_RESOLUTION && window.innerWidth < LAPTOP_L_RESOLUTION) {
        setCardsAmount({init: LAPTOP_INIT_CARDS, more: LAPTOP_MORE_CARDS});
      } else {
        setCardsAmount({init: LAPTOP_L_INIT_CARDS, more: LAPTOP_L_MORE_CARDS});
      }
    }

    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi.getUserData()
        .then(({name, email}) => {
          setCurrentUser((prev) => ({name: name, email: email, isLoggedIn: true}))
        })
        .catch(error => console.log(error))
    }

    handleScreenResize();
    window.addEventListener('resize', handleScreenResize);
    return () => {
      window.removeEventListener('resize', handleScreenResize);
    };
  }, [])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/signup" element={<RedirectAuth element={Register} isRegister={handleRegisterSubmit}/>}/>
          <Route path="/signin" element={<RedirectAuth element={Login} isLogin={handleLoginSubmit} setCurrentUser={setCurrentUser}/>}/>
          <Route path="/movies" element={<ProtectedRoute
            element={Movies} cardsAmount={cardsAmount} beatMoviesList={beatMoviesList}
            setBeatMoviesList={setBeatMoviesList} savedList={savedList} setSavedList={setSavedList}/>
          }/>
          <Route path="/profile" element={<ProtectedRoute element={Profile} setCurrentUser={setCurrentUser} setBeatMoviesList={setBeatMoviesList}/>}/>
          <Route path="/saved-movies" element={<ProtectedRoute
            element={SavedMovies} cardsAmount={cardsAmount}
            beatMoviesList={beatMoviesList} setBeatMoviesList={setBeatMoviesList}
            savedList={savedList} setSavedList={setSavedList}
          />}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  )
}
