import React from "react";
import { useLocation } from "react-router-dom";
// импорт стилей
import "./MoviesCard.css";
// импорт блоков
// фотоimport 
import Picture from "../../images/Card-pic1.png";
// импорт базовых
const MoviesCard = (props) => {
	const { isSavedMovies = true } = props;
	const location = useLocation();
	return (
		<div className="movie-card">
			<img src={Picture} alt="Постера фильма" className="movie-card__image" />
			<div className="movie-card__container">
				<div className="movie-card__container-text">
					<h2 className="movie-card__title">
						33 слова о дизайне
					</h2>
					<p className="movie-card__text">
						1ч42м
					</p>
				</div>
				<button className={`movie-card__save 
				${isSavedMovies ? "movie-card__save-active"
						: ""
					}
				${location.pathname === "/saved-movies"
						? "movie-card__delete"
						: ""
					} 
			`} />
			</div>
		</div>
	);
};
export default MoviesCard;
