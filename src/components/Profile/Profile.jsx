import {Header} from "../Header/Header";
import "./Profile.css"
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import {useNavigate} from "react-router-dom";
import {
  CONFLICT_MESSAGE,
  CONFLICT_STATUS,
  INTERNAL_ERROR_STATUS,
  INTERNAL_SERVER_ERROR,
  PROFILE_UPDATE_ERROR,
  PROFILE_UPDATE_SUCCESS
} from "../../utils/constants";
import {mainApi} from "../../utils/MainApi";

export function Profile({setCurrentUser}) {
  const [isSubmitPresent, setIsSubmitPresent] = useState(false);
  const [alert, setAlert] = useState({level: "blank", message: ""});
  const user = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, setValues, setIsValid} = useFormAndValidation();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    mainApi.setUserData(values.name, values.email)
      .then(({name, email}) => {
        setCurrentUser((prev) => ({...prev, name: name, email: email}))
        setAlert({level: "info", message: PROFILE_UPDATE_SUCCESS});
        setIsSubmitPresent(false);
        setIsValid(false);
      })
      .catch(error => {
        if (error === CONFLICT_STATUS) {
          setAlert({level: "error", message: CONFLICT_MESSAGE});
          setIsValid(false);
        } else if (error === INTERNAL_ERROR_STATUS) {
          setAlert({level: "error", message: INTERNAL_SERVER_ERROR});
        } else {
          setAlert({level: "error", message: PROFILE_UPDATE_ERROR})
        }
      })
  }

  function handleInput(e) {
    handleChange(e);
    const {name, value} = e.target
    if ((name === "name" && value === user.name) && (values["email"] === user.email)) {
      setIsValid(false);
    }
    if ((name === "email" && value === user.email) && (values["name"] === user.name)) {
      setIsValid(false);
    }
  }

  function logout() {
    setCurrentUser(() => ({name: "", email: "", isLoggedIn: false}));
    localStorage.clear();
    navigate('/', {replace: true});
  }

  function handleEdit() {
    setIsSubmitPresent(p => !p);
    setAlert({level: "blank", message: ""});
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
              disabled={!isSubmitPresent}
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
              disabled={!isSubmitPresent}
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
                <button type="button" className="profile__edit button-hover"
                        onClick={handleEdit}>
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