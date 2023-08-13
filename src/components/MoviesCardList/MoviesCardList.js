import React from "react";
import { useLocation } from "react-router-dom";
// импорт стилей
import "./MoviesCardList.css";
// импорт блоков
import MoviesCard from "../MoviesCard/MoviesCard";
// импорт базовых
const MoviesCardList = () => {
	const location = useLocation();
	return (
		<section className={`movies-cardlist
		${location.pathname === "/saved-movies"
				? "movies-cardlist__empty"
				: ""
			} `}>
			<MoviesCard />
			<MoviesCard />
			<MoviesCard />
			<MoviesCard />
			<MoviesCard />
			<MoviesCard />
			<MoviesCard />
			<MoviesCard />
			<MoviesCard />
			<MoviesCard />
		</section>
	);
};
export default MoviesCardList;
