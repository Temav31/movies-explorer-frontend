// импорт стилей
import "./SearchForm.css";
import React from "react";
// 
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

const SearchForm = () => {
	return (
		<div className="search-form">
			<form className="search-form__form">
				<input className="search-form__input" placeholder="Фильм" required />
				<button className="search-form__button" type="submit">
					{/* Поиск  */}
				</button>
			</form>
			<FilterCheckbox />
		</div>
	);
};
export default SearchForm;
