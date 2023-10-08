import "./SearchForm.css"
import searchIcon from "../../../images/serach.svg"
import {ReactComponent as CheckboxOn} from "../../../images/check-on.svg";
import {ReactComponent as CheckboxOff} from "../../../images/check-off.svg";
import {useState} from "react";
import {Popup} from "../../Popup/Popup";

export function SearchForm({onSearch, input, onChange, isShort, onCheckboxChange}) {
  const [isEmpty, setIsEmpty] = useState(false);

  async function handleCheckboxChange(e) {
    await onCheckboxChange(e);
    e.target.form.requestSubmit();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) {
      setIsEmpty(true);
      setTimeout(() => setIsEmpty(false), 5000);
    } else {
      onSearch(input, isShort);
    }
  }

  return (
    <form className="search-form" noValidate onSubmit={handleSubmit}>
      <div className="search-form__input-container">
        <img className="search-form__search-icon" alt="Поиск" src={searchIcon}/>
        <input
          type="text"
          name="search"
          required
          placeholder="Фильм"
          className="search-form__search-input"
          value={input || ''}
          onChange={onChange}
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
      {isEmpty && <Popup message="Нужно ввести ключевое слово" severity="Error"/>}
    </form>
  )
}