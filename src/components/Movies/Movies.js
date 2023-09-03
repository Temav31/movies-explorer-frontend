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
		movies
	} = props;

	const [valueCheckbox, setValueCheckbox] = React.useState(JSON.parse(localStorage.getItem("status")));
	
	// const [listMovie, setlistMovie] = React.useState([]);
	// React.useEffect(() => {
	// 	setData(false);
	// 	setlistMovie((valueCheckbox
	// 		? JSON.parse(localStorage.getItem("foundMovies"))
	// 		: JSON.parse(localStorage.getItem("movies"))) || []);
	// }, [data]);
		// const listMovie = valueCheckbox
		// 	? JSON.parse(localStorage.getItem("foundMovies")) || []
		// 	: JSON.parse(localStorage.getItem("movies")) || [];


	// const pageWidth = useChangePage().width;
	// const [loadMoreNumber, setLoadMoreNumber] = React.useState(limitStart(pageWidth));
	// const initialLimit = limitMovie(pageWidth);
	// const [index, setIndex] = React.useState(initialLimit);

	// React.useEffect(() => {
	// 	setLoadMoreNumber(limitStart(pageWidth))
	// }, [pageWidth]);

	// // функции
	// function limitMovie(data) {
	// 	if (data < MEDIUM_WIDTH) {
	// 		return SMALL_SEARCH;
	// 	} else {
	// 		return MEDIUM_SEARCH;
	// 	}
	// }
	// function limitStart(data) {
	// 	if (data < MEDIUM_WIDTH) {
	// 		return SMALL_ADD_MOVIES;
	// 	} else {
	// 		return ADD_MOVIES;
	// 	}
	// }

	// const [list, setList] = React.useState(movies.slice(0, index));
	// const [showMore, setShowMore] = React.useState(movies.length > index);
	// React.useEffect(() => {
	// 	setData(false);
	// 	if (movies.length === list.length) {
	// 		setList(list => list.map(item => movies.find(i => i.id === item.id)));
	// 	} else {
	// 		(movies.slice(0, index));
	// 		setShowMore(movies.length > index)
	// 		setIndex(initialLimit);
	// 	}
	// }, [data]);

	function onCheckboxChange() {
		setValueCheckbox(!valueCheckbox);
		onClick(movies, "movies", !valueCheckbox);
		localStorage.setItem("status", JSON.parse(!valueCheckbox));
	};

	// const handleAddMovie = () => {
	// 	const newIndex = index + loadMoreNumber;
	// 	const newShowMore = newIndex < movies.length - 1;
	// 	const newList = list.concat(movies.slice(index, newIndex));
	// 	console.log(newList);
	// 	setIndex(newIndex);
	// 	setList(newList);
	// 	setShowMore(newShowMore);
	// };

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
						list={movies}
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
