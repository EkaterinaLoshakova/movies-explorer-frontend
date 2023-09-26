import "./NotFound.css"
import {useNavigate} from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__description">Страница не найдена</p>
      <button type="button" className="not-found__back button-hover" onClick={() => navigate(-1)}>Назад</button>
    </section>
  )
}