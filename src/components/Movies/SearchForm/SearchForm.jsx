import "./SearchForm.css"
import searchIcon from "../../../images/serach.svg"
import {ReactComponent as CheckboxOn} from "../../../images/check-on.svg";
import {ReactComponent as CheckboxOff} from "../../../images/check-off.svg";
import {useState} from "react";

export function SearchForm() {
  const [input, setInput] = useState('');
  const [isShort, setIsShort] = useState(false);

  function handleChange(e) {
    setInput(() => (e.target.value))
  }

  function handleCheckboxChange(e) {
    setIsShort(() => (e.target.checked))
  }

  return (
    <form className="search-form">
      <div className="search-form__input-container">
        <img className="search-form__search-icon" alt="Поиск" src={searchIcon}/>
        <input
          type="text"
          name="search"
          required
          placeholder="Фильм"
          className="search-form__search-input"
          value={input || ''}
          onChange={handleChange}
        />
        <button type="submit" className="search-form__submit button-hover"/>
      </div>
      <label className="search-form__checkbox-container button-hover">
        <input
          className="search-form__checkbox"
          type="checkbox"
          name="checkbox"
          id="checkbox"
          onChange={handleCheckboxChange}
          checked={isShort}
        />
        {isShort
          ?
          <CheckboxOn className="search-form__checkbox-svg"/>
          :
          <CheckboxOff className="search-form__checkbox-svg"/>}
        Короткометражки</label>
    </form>
  )
}