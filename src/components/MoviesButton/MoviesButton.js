import React from "react";
// импорт стилей
import "./MoviesButton.css";
// импорт блоков
const MoviesButton = (props) => {
	const { onClick,
		list,
		cardList
	} = props;
	return (
		// "" 
		<div
			className={`movies-button 
				${list.length !== cardList.length ? "" : "movies-button__save-movies"}
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
