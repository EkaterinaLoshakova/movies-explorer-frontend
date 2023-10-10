import useFormAndValidation from "../../hooks/useFormAndValidation";
import {Logo} from "../Logo/Logo";
import {Link} from "react-router-dom";
import {
  AUTH_ERROR,
  AUTH_STATUS,
  CONFLICT_MESSAGE,
  CONFLICT_STATUS,
  INTERNAL_ERROR_STATUS,
  INTERNAL_SERVER_ERROR,
  LOGIN_ERROR,
} from "../../utils/constants";
import {useState} from "react";

export function Login({isLogin}) {
  const {values, handleChange, errors, isValid, setIsValid} = useFormAndValidation();
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Block submit
    setIsValid(p => !p);
    isLogin(values.email, values.password)
      .catch(error => {
          if (error === CONFLICT_STATUS) {
            setError(CONFLICT_MESSAGE);
          } else if (error === AUTH_STATUS) {
            setError(AUTH_ERROR);
          } else if (error === INTERNAL_ERROR_STATUS) {
            setError(INTERNAL_SERVER_ERROR);
          } else {
            setError(LOGIN_ERROR);
          }
        }
      )
  }

  return (
    <section className="registration">
      <div className="registration__container">
        <Logo/>
        <h1 className="registration__title">Рады видеть!</h1>
        <form className="registration__form" noValidate onSubmit={handleSubmit}>
          <label className="registration__form-label">
            <span className="registration__input-label">E-mail</span>
            <input
              type="email"
              name="email"
              required
              minLength="2"
              maxLength="30"
              placeholder=""
              className="registration__input"
              value={values['email'] || ''}
              onChange={handleChange}
            />
            <span className="registration__input-error">{errors["email"]}</span>
          </label>
          <label className="registration__form-label">
            <span className="registration__input-label">Пароль</span>
            <input
              type="password"
              name="password"
              required
              minLength="6"
              maxLength="30"
              placeholder=""
              className="registration__input"
              value={values['password'] || ''}
              onChange={handleChange}
            />
            <span className="registration__input-error">{errors["password"]}</span>
          </label>
          <div className="registration__footer">
            <p className="registration__response-error">{error}</p>
            <button
              type="submit"
              className={`registration__submit button-hover${isValid ? '' : ' registration__submit_disabled'}`}
              disabled={!isValid}>Войти
            </button>
            <p className="registration__footer-caption">Ещё не зарегистрированы?
              <Link to="/signup" className="registration__footer-link link-hover">Регистрация</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}