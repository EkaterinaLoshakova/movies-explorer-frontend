import "./App.css"
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
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

export function App() {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "Виталий",
    email: "pochta@yandex.ru",
    isLoggedIn: false
  });
  const [cardsAmount, setCardsAmount] = useState({init: 16, more: 4, saved: 3});

  useEffect(() => {
    const handleScreenResize = () => {
      if (window.innerWidth < TABLET_RESOLUTION) {
        setCardsAmount({init: MOBILE_INIT_CARDS, more: MOBILE_MORE_CARDS, saved: 2});
      } else if (window.innerWidth >= TABLET_RESOLUTION && window.innerWidth < LAPTOP_RESOLUTION) {
        setCardsAmount({init: TABLET_INIT_CARDS, more: TABLET_MORE_CARDS, saved: 3});
      } else if (window.innerWidth >= LAPTOP_RESOLUTION && window.innerWidth < LAPTOP_L_RESOLUTION) {
        setCardsAmount({init: LAPTOP_INIT_CARDS, more: LAPTOP_MORE_CARDS, saved: 3});
      } else {
        setCardsAmount({init: LAPTOP_L_INIT_CARDS, more: LAPTOP_L_MORE_CARDS, saved: 3});
      }
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
          <Route path="/movies" element={<Movies cardsAmount={cardsAmount}/>}/>
          <Route path="/saved-movies" element={<SavedMovies cardsAmount={cardsAmount}/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/signin" element={<Login setCurrentUser={setCurrentUser}/>}/>
          <Route path="/profile" element={<Profile setCurrentUser={setCurrentUser}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  )
}
