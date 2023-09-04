import React, { useState, useEffect } from "react";
// импорт стилей
// import "./Movies.css";
// импорт блоков
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// компонент
import useChangePage from '../../hooks/useChangePage';

// загрузка
import Preloader from "../Preloader/Preloader";
// импорт кнопки
import MoviesButton from "../MoviesButton/MoviesButton";
import {
	MOVIES_LIMIT,
	SMALL_WIDTH,
	MEDIUM_WIDTH,
	BIG_WIDTH,
	SMALL_SEARCH,
	MEDIUM_SEARCH,
	BIG_SEARCH,
	SMALL_ADD_MOVIES,
	ADD_MOVIES,
} from "../../utils/constant";
// import { flushSync } from 'react-dom';
// константы
import { LENGHT_MOVIE } from '../../utils/constant';


const Movies = (props) => {
	const {
		isLogin,
		preloader,
		onAddMovies,
		onDeleteMovies,
		onClick,
		onSearch,
		data,
		setData,
		movies,
		value,
		list,
	} = props;

	const [valueCheckbox, setValueCheckbox] = React.useState(false);
	// console.log(valueCheckbox)
	const [name, setName] = useState(localStorage.getItem('name'));

	const [listMovie, setlistMovie] = React.useState([]);
	React.useEffect(() => {
		setData(false);
		// setlistMovie((valueCheckbox
		// 	? JSON.parse(localStorage.getItem("foundMovies"))
		// 	: JSON.parse(localStorage.getItem("movies"))) || []);
		setlistMovie(JSON.parse(localStorage.getItem("foundMovies")) || []);
	}, [data]);
	// const [albom, setAlbom] = React.useState([]);
	// const [film, setFilm] = React.useState([]);
	// const [listMovie, setlistMovie] = React.useState([]);

	// 	React.useEffect(() => {
	// 	setData(false);
	// 	if (name === "") {
	// 		setAlbom(list.filter((film) => film.duration < LENGHT_MOVIE));
	// 		setFilm(albom)
	// 		// list = movies;
	// 	} else {
	// 		setAlbom(list.filter((item) => item.nameRU.toLowerCase().includes(name.toLowerCase())));
	// 		setFilm(albom.filter((film) => film.duration < LENGHT_MOVIE));
	// 	}
	// 	if (valueCheckbox !== true) {
	// 		setlistMovie(film);
	// 	}
	// 	else {
	// 		setlistMovie(albom);
	// 	}
	// 	// setTimeout(handleMovie(), 10000);
	// 	console.log(listMovie)
	// }, [data, movies, onDeleteMovies,onAddMovies]);

	function handleMovie() {
		// setlistMovie(movies);

	}

	function onCheckboxChange() {
		setValueCheckbox(!valueCheckbox);
		onClick(!valueCheckbox);
		console.log(valueCheckbox)
		// localStorage.setItem("statusSave", valueCheckbox);
		localStorage.setItem("status", valueCheckbox);
	};

	return (
		<>
			<Header
				isLogin={isLogin}
			/>
			{/* Основной бллок */}
			<main>
				<SearchForm
					onSearch={onSearch}
					valueCheckbox={valueCheckbox}
					setData={setData}
					isData={data}
					onCheckboxChange={onCheckboxChange}
				/>
				{preloader ? (
					<Preloader />
				) : (
					//  "" 
					<MoviesCardList
						isData={data}
						setData={setData}
						onAddMovies={onAddMovies}
						onDeleteMovies={onDeleteMovies}
						list={value ? list : movies}
					/>
				)
				}
				{/* {showMore && <MoviesButton onClick={handleAddMovie} />} */}
			</main>
			{/* Конец основного блока */}
			<Footer />
		</>
	);
};
export default Movies;
