import React from "react";
// импорт стилей
import "./SavedMovies.css";
// импорт блоков
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
// импорт базовых
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// загрузка
import Preloader from "../Preloader/Preloader";

const SavedMovies = (props) => {
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
export default SavedMovies;
