import useFormAndValidation from "../../hooks/useFormAndValidation";
import {Logo} from "../Logo/Logo";
import {Link, useNavigate} from "react-router-dom";

export function Login({setCurrentUser}) {
  const {values, handleChange, errors, isValid} = useFormAndValidation();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setCurrentUser((prev) => ({...prev, isLoggedIn: true}));
    navigate("/movies");
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
            <p className="registration__response-error"></p>
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