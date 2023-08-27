// импорт стилей
import "./SearchForm.css";
import React from "react";
// локация
import {useLocation} from "react-router-dom";
// 
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

const SearchForm = (props) => {
	const {
		isSearch,
		isClick,
	} = props;
	// стейт переменные
	const [error, setError] = React.useState({ errorText: "", value: true });
	const [shortMovies, setShortMovies] = React.useState(true);
	const [nameMovie, setNameMovie] = React.useState("");

	React.useEffect(() => {
		error.value && setError({errorText:"", value: true});
	}, []);

	// заполнение статуса
	React.useEffect(() => {
		const value = JSON.parse(localStorage.getItem('status'));
		// console.log(value);
		if (value !== null) {
			setShortMovies(value);
		}
		else {
			setShortMovies(true);
		}
	}, []);
	// локация 
	const location = useLocation();
	React.useEffect(() => {
		if (location.pathname === '/saved-movies') {
			const value = JSON.parse(localStorage.getItem('statusSaved'));
			setShortMovies(value);
			isClick(value);
		}
		if (location.pathname === '/movies') {
			const name = localStorage.getItem('name');
			setNameMovie(name);
			const value = JSON.parse(localStorage.getItem('status'));
			// console.log(value);
			setShortMovies(value);
		}
	}, [location]);
	function handleChange(e) {
		const target = e.target;
		setNameMovie(target.value);
		if (target.value.length !== 0) {
			setError({
				errorText: "",
				value: target.validity.valid,
			});
		} else {
			setError({
				errorText: "Запрос не введён!",
				value: target.validity.valid,
			});
		}
	}

	function handleCheckbox() {
		setShortMovies(!shortMovies);
		isClick(shortMovies);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!nameMovie) {
			setError({
				errorText: "Запрос не введён!",
				value: false,
			});
			return error;
		}
		// console.log("запрос");
		// console.log(nameMovie, shortMovies);
		isSearch(nameMovie, shortMovies);
	}
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
					onChange={handleChange}
					value={nameMovie}
					// required
				/>
				<button 
				className="search-form__button"
					type="submit"
				/>
			</form>
			<p className="search-form__text">{error.errorText}</p>
			<FilterCheckbox
				onCheckbox={handleCheckbox}
				valueCheckbox={shortMovies}
			/>
		</div>
	);
};
export default SearchForm;
