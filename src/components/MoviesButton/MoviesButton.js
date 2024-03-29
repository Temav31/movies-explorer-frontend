import React from "react";
// импорт стилей
import "./MoviesButton.css";
// импорт блоков
const MoviesButton = (props) => {
	const { onClick,
		isFound,
		cardList
	} = props;
	return (
		<div
			className={`movies-button 
				${isFound.length !== cardList.length ? "" : "movies-button__save-movies"}
		`}>
			<button
				className="movies-button__button"
				onClick={onClick}
			>
				Ещё
			</button>
		</div>
	);
};
export default MoviesButton;
