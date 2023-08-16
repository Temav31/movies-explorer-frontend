import React from "react";
// импорт стилей
import "./MoviesButton.css";
// импорт блоков
const MoviesButton = (props) => {
	return (
		<div className="movies-button">
			<button className="movies-button__button">
				Ещё
			</button>
		</div>
	);
};
export default MoviesButton;
