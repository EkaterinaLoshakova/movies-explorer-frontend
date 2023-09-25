import "./Register.css"
import {Logo} from "../Logo/Logo";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import {Link} from "react-router-dom";

export function Register() {
  const {values, handleChange, errors, isValid} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="registration">
      <div className="registration__container">
        <Logo/>
        <h1 className="registration__title">Добро пожаловать!</h1>
        <form className="registration__form" noValidate onSubmit={handleSubmit}>
          <label className="registration__form-label">
            <span className="registration__input-label">Имя</span>
            <input
              type="text"
              name="name"
              required
              minLength="2"
              maxLength="30"
              placeholder=""
              className="registration__input"
              value={values['name'] || ''}
              onChange={handleChange}
            />
            <span className="registration__input-error">{errors["name"]}</span>
          </label>
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
              disabled={!isValid}>Зарегистрироваться
            </button>
            <p className="registration__footer-caption">Уже зарегистрированы?
              <Link to="/signin" className="registration__footer-link link-hover">Войти</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}