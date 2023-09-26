import {Header} from "../Header/Header";
import "./Profile.css"
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import {useNavigate} from "react-router-dom";
import {PROFILE_UPDATE_ERROR} from "../../utils/constants";

export function Profile({setCurrentUser}) {
  const [isSubmitPresent, setIsSubmitPresent] = useState(false);
  const [alert, setAlert] = useState({level:"blank", message: ""});
  const user = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, setValues, setIsValid} = useFormAndValidation();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setAlert({level: "error", message: PROFILE_UPDATE_ERROR})
    setIsValid(false);
  }

  function handleInput(e) {
    handleChange(e);
    const {name, value} = e.target
    if ((name === "name" && value === user.name) || (name === "email" && value === user.email)) {
      setIsValid(false);
    }
  }

  function logout() {
    setCurrentUser((prev) => ({...prev, isLoggedIn: false}));
    navigate('/', {replace: true});
  }

  useEffect(() => {
    setValues({name: user.name, email: user.email});
  }, [setValues, user.email, user.name]);

  return (
    <>
      <Header/>
      <section className="profile">
        <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
        <form className="profile__form" noValidate onSubmit={handleSubmit}>
          <label className="profile__form-label ">
            <span className="profile__input-label">Имя</span>
            <input
              type="text"
              name="name"
              required
              minLength="2"
              maxLength="30"
              placeholder=""
              className="profile__input"
              value={values['name'] || ''}
              onChange={handleInput}
            />
          </label>
          <span className="profile__input-error profile__input-error_type_underline">{errors["name"]}</span>
          <label className="profile__form-label profile__form-label_padding_top">
            <span className="profile__input-label">E-mail</span>
            <input
              type="email"
              name="email"
              required
              minLength="2"
              maxLength="30"
              placeholder=""
              className="profile__input"
              value={values['email'] || ''}
              onChange={handleInput}
            />
          </label>
          <span className="profile__input-error">{errors["email"]}</span>
          <div className="profile__footer">
            <p className={`profile__response profile__response-${alert.level}`}>{alert.message}</p>
            {isSubmitPresent
              ?
              <button
                type="submit"
                className={`profile__submit button-hover${isValid ? '' : ' profile__submit_disabled'}`}
                disabled={!isValid}>Сохранить
              </button>
            :
              <>
                <button type="button" className="profile__edit button-hover" onClick={() => setIsSubmitPresent(p => !p)}>
                  Редактировать
                </button>
                <button type="button" className="profile__logout button-hover" onClick={logout}>
                  Выйти из аккаунта
                </button>
              </>
            }
          </div>
        </form>
      </section>
    </>
  )
}