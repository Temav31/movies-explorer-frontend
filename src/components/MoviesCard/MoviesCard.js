import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// импорт стилей
import "./MoviesCard.css";
// импорт блоков
import { getLenghtMovie, serverUrl } from "../../utils/constant";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';



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
	const [isLike, setIsLike] = useState(false)
	const userContext = useContext(CurrentUserContext)

	useEffect(() => {
		const isLiked = JSON.parse(localStorage.getItem('saveMovies')).find((value) => movie.id === value.movieId)
		setIsLike(Boolean(isLiked))
	}, [])
	// сохраненные фильмы
	function handleSave() {

		const setValue = (value) => setIsLike(value)
		// console.log(save);
		if ((location.pathname === "/movies" && isLike)
		|| (location.pathname === "/saved-movies")) {
			onDelete(movie).then(setValue).catch(setValue)
		} else {   
			onSave(movie).then(setValue).catch(setValue)
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
				${isLike ? "movie-card__save-active"
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
