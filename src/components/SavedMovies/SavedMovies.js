import { useEffect, useState } from "react";
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
		preloader,
		onDeleteMovies,
		onSearch,
		saveMovies,
		saveMoviesShort
	} = props;
	const [valueCheckbox, setValueCheckbox] = useState(false);
	const [visibleMovies, setVisibleMovies] = useState([]);

	function onCheckboxChange() {
		setValueCheckbox(!valueCheckbox);
	};

	useEffect(() => {
		onSearch('');
	}, [])

	useEffect(() => {

		if (valueCheckbox) {
			setVisibleMovies(saveMoviesShort);
		} else {
			setVisibleMovies(saveMovies);
		}
		

	}, [saveMovies, saveMoviesShort, valueCheckbox]);

	return (
		<>
			<Header
				isLogin={isLogin}
			/>
			{/* Основной бллок */}
			<main>
				<SearchForm
					onSearch={onSearch}
					valueCheckbox={valueCheckbox}
					onCheckboxChange={onCheckboxChange}
				/>
				{preloader ? (
					<Preloader />
				) : (
					<MoviesCardList
					onDeleteMovies={onDeleteMovies}
					list={visibleMovies}
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
