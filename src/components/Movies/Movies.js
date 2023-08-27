import React from "react";
// импорт стилей
// import "./Movies.css";
// импорт блоков
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import MoviesButton from "../MoviesButton/MoviesButton";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// загрузка
import Preloader from "../Preloader/Preloader";

const Movies = (props) => {
	const {
		isLogin,
		isAddMovies,
		isDeleteMovies,
		isClick,
		isSearch,
		isSave,
		isFound,
		preloader,
		message,
	} = props;
	return (
		<>
			<Header
				isLogin={isLogin}
			/>
			{/* Основной бллок */}
			<main>
				<SearchForm
					isSearch={isSearch}
					isClick={isClick}
				/>
				{preloader ? (
					<Preloader />
				) : (
					<MoviesCardList
						isFound={isFound}
						isSave={isSave}
						isAddMovies={isAddMovies}
						isDeleteMovies={isDeleteMovies}
						message={message}
					/>
				)
				}
			</main>
			{/* Конец основного блока */}
			<Footer />
		</>
	);
};
export default Movies;
