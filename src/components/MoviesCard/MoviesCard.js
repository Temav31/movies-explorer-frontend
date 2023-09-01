import React from "react";
import { useLocation } from "react-router-dom";
// импорт стилей
import "./MoviesCard.css";
// импорт блоков
import { getLenghtMovie, serverUrl } from "../../utils/constant";
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// импорт базовых
const MoviesCard = (props) => {
	const {
		movie,
		// key,
		onSave,
		onDelete,
		// save,
	} = props;
	const location = useLocation();
	const save = movie.isSave;
	// сохраненные фильмы
	function handleSave() {
		// console.log(save);
		if ((location.pathname === "/movies" && save)
		|| (location.pathname === "/saved-movies")) {
			onDelete(movie);
		} else {   
			onSave(movie);
		}
	};
	let imageUrl;
	movie.image.url
		? (imageUrl = serverUrl + movie.image.url)
		: (imageUrl = movie.image);
	return (
		<div className="movie-card">
			<a
				target="_blank"
				className=""
				rel="noreferrer"
				href={movie.trailerLink ? movie.trailerLink : ""}
			>
				<img src={imageUrl} alt={`Фильм - ${movie.nameRU}`} className="movie-card__image" />
			</a>
			<div className="movie-card__container">
				<div className="movie-card__container-text">
					<h2 className="movie-card__title">
						{movie.nameRU}
					</h2>
					<p className="movie-card__text">
						{getLenghtMovie(movie.duration, movie)}
					</p>
				</div>
				<button className={`movie-card__save 
				${save ? "movie-card__save-active"
						: ""
					}
				${location.pathname === "/saved-movies"
						? "movie-card__delete"
						: ""
					} 
			`}
					onClick={handleSave}
				/>
			</div>
		</div>
	);
};
export default MoviesCard;
