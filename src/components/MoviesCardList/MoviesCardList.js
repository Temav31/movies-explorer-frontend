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
				{list.map((movie) => (
					<MoviesCard 
						movie={movie}
						// key={movie.id || movie._id}
						key={movie.id}
						onSave={onAddMovies}
						onDelete={onDeleteMovies}
					/>
				))}
			</div>
		</section>
	);
};
export default MoviesCardList;
