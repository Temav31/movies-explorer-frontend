import React from "react";
// импорт стилей
// import "./Movies.css";
// импорт блоков
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesButton from "../MoviesButton/MoviesButton";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const Movies = (props) => {
	return (
		<>
		<Header />
		{/* Основной бллок */}
		<main>
			<SearchForm />
			<MoviesCardList />
			<MoviesButton />
		</main>
		{/* Конец основного блока */}
		<Footer />
		</>
	);
};
export default Movies;
