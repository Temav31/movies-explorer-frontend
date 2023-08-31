// импорт стилей
import "./SearchForm.css";
import React from "react";
// локация
import { useLocation } from "react-router-dom";
// 
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

const SearchForm = (props) => {
	const {
		onSearch,
		valueCheckbox,
		setData,
		isData,
		onCheckboxChange,
	} = props;

	// локация 
	const location = useLocation();
	const [value, setValue] = React.useState("");
	// const [text, setText] = React.useState("");
	React.useEffect(() => {
		setData(false);
	}, [isData]);
	
	const handleSubmit = (event) => {
		event.preventDefault();
		onSearch(value);
	};

	function handleChange(e) {
		setValue(e.target.value);
	}
	const text =
	location.pathname === "/movies" ?
		localStorage.getItem("name") :
		localStorage.getItem("saveName");
	return (
		<div className="search-form">
			<form
				className="search-form__form"
				name="searchMovies"
				onSubmit={handleSubmit}
			>
				<input
					className="search-form__input"
					placeholder="Фильм"
					required
					defaultValue={text}
					onChange={handleChange}
					type='name'
				/>
				<button
					className="search-form__button"
					type="submit"
				/>
			</form>
			<FilterCheckbox
				value={valueCheckbox}
				onCheckboxChange={onCheckboxChange}
			/>
		</div>
	);
};
export default SearchForm;
