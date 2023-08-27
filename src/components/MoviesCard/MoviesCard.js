import React from "react";
import { useLocation } from "react-router-dom";
// импорт стилей
import "./MoviesCard.css";
// импорт блоков
// фотоimport 
// import Picture from "../../images/Card-pic1.png";

import { getLenghtMovie, serverUrl } from "../../utils/constant";

// импорт базовых
const MoviesCard = (props) => {
	const {
		movie,
		// id,
		onSave,
		onDelete,
		isSave,
	} = props;
	const location = useLocation();
	// сохраненные фильмы
	const isValue = isSave.find((element) => element.moveId === movie.id);
	const [saveValue, setSaveValue] = React.useState(false);
	// сохранение фильмов
	function handleSave() {
		// setSaveValue(!saveValue);
		if (isValue) {
			onSave(isValue);
		} else {
			onSave(movie);
		}
		// console.log(saveValue);
	};
	// удвление фильмов
	function handleDelete() {
		if (location.pathname !== "/movies") {
			onDelete(isValue);
		} else {
			onDelete(movie);
		}
	};
	function handleChange() {
		if (location.pathname === "/saved-movies") {
			onDelete(movie);
		} else {
			console.log(isValue);
			setSaveValue(!saveValue);
			handleSave();
		}
	}
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
				${isValue ? "movie-card__save-active"
						: ""
					}
				${location.pathname === "/saved-movies"
						? "movie-card__delete"
						: ""
					} 
			`}
					onClick={handleChange}
				/>
			</div>
		</div>
	);
};
export default MoviesCard;
