// импорт стилей
import "./FilterCheckbox.css";
import React from "react";
// 

const FilterCheckbox = () => {
	return (
		<div className="filter-checkbox">
			<label className="filter-checkbox__ladel">
				<input className="filter-checkbox__input" placeholder="Фильм" required />
				<span className="filter-checkbox__span" type="submit">
				</span>
			</label>
			<p className="filter-checkbox__text">
				Короткометражки
			</p>
		</div>
	);
};
export default FilterCheckbox;
