import React from "react";
// импорт стилей
import "./SavedMovies.css";
// импорт блоков
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
// импорт базовых
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const SavedMovies = (props) => {
	return (
		<>
		<Header />
		{/* Основной бллок */}
		<main>
			<SearchForm />
			<MoviesCardList />
		</main>
		{/* Конец основного блока */}
		<Footer />
		</>
	);
};
export default SavedMovies;
