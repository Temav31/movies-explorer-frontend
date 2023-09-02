import React from "react";
import { useLocation } from "react-router-dom";
// импорт стилей
import "./MoviesCardList.css";
// импорт блоков
import MoviesCard from "../MoviesCard/MoviesCard";
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
// импорт кнопки
import MoviesButton from "../MoviesButton/MoviesButton";
// импорт базовых
const MoviesCardList = (props) => {
	const {
		isData,
		setData,
		onAddMovies,
		onDeleteMovies,
		list,
	} = props;
	// console.log(list);
	const location = useLocation();
	const [pageWidth, setPageWidth] = React.useState(BIG_WIDTH);
	// лимит карточек
	const [movieLimit, setMovieLimit] = React.useState(BIG_SEARCH);
	const [cardList, setCardList] = React.useState([]);

	React.useEffect(() => {
		setCards();
	}, [movieLimit]);
	// разметка по ширине страницы
	function handleupdateLimit() {
		if (pageWidth >= BIG_WIDTH) {
			setSearchCards(BIG_SEARCH);
		} else if (pageWidth >= MEDIUM_WIDTH) {
			setSearchCards(MEDIUM_SEARCH);
		} else if (pageWidth >= SMALL_WIDTH) {
			setSearchCards(SMALL_SEARCH);
		}
		if (location.pathname === '/saved-movies') {
			setMovieLimit(MOVIES_LIMIT);
		}
	};
	// функция обновления ширины
	function handleUpdateWidth() {
		// console.log(isSave);
		// isSave.map((item) => {
		// 	console.log("hi");
		// })
		setPageWidth(window.innerWidth);
	}
	// функция увеличения ширины
	function handleAddWidth() {
		window.addEventListener("resize", handleUpdateWidth);
	}
	// функция уменьшения ширины
	function handleRemoveWidth() {
		window.removeEventListener("resize", handleUpdateWidth);
	}
	// функция заполнения карточек
	function setCards() {
		let films = [];
		
		list.forEach((item, el) => {
			if (el < movieLimit) {
				films.push(item);
			}
		});
		setCardList(films);
	};
	// функция заполнения найденых карточек
	function setSearchCards(data) {
		setMovieLimit(data)
		let films = [];
		list.forEach((item, el) => {
			if (el < movieLimit) {
				films.push(item);
			}
		});
		setCardList(films);
	};
	// функция добавления карточек
	function handleAddMovie() {
		if (pageWidth > MEDIUM_WIDTH) {
			setMovieLimit(movieLimit + ADD_MOVIES);
		} else {
			setMovieLimit(movieLimit + SMALL_ADD_MOVIES);
		}
	}
	// изменение по размеру
	React.useEffect(() => {
		handleupdateLimit();
	}, [pageWidth, list, location]);
	React.useEffect(() => {
		handleAddWidth();
		return () => handleRemoveWidth();
	}, [movieLimit]);

	return (
		<section>
			<p className="movies-cardlist__text">
				{list.length === 0  ? "Ничего не найдено" : ""}
				</p>
			<div className={`movies-cardlist
		${location.pathname === "/saved-movies"
					? "movies-cardlist__empty"
					: ""
				} `}>
				{cardList.map((movie) => (
					<MoviesCard 
						movie={movie}
						key={movie.id || movie._id}
						onSave={onAddMovies}
						onDelete={onDeleteMovies}
						// save={movie.isSave}
					/>
				))}
			</div>
			{location.pathname === "/movies" ? (
				<MoviesButton
					onClick={handleAddMovie}
					cardList={cardList}
					list={list}
				/>
			) : ("")}
		</section>
	);
};
export default MoviesCardList;
