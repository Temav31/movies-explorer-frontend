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

	const [valueCheckbox, setValueCheckbox] = React.useState(JSON.parse(localStorage.getItem("status")));

	const [listMovie, setlistMovie] = React.useState([]);
	React.useEffect(() => {
		setData(false);
		setlistMovie((valueCheckbox
			? JSON.parse(localStorage.getItem("foundMovies"))
			: JSON.parse(localStorage.getItem("movies"))) || []);

	}, [data]);


	function onCheckboxChange() {
		setValueCheckbox(!valueCheckbox);
		onClick(movies, "movies", !valueCheckbox);
		localStorage.setItem("status", JSON.parse(!valueCheckbox));
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
