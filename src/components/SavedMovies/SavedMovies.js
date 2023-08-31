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
		preloader,
		data,
		setData,
		onDeleteMovies,
		onClick,
		onSearch,
	} = props;
	const [valueCheckbox, setValueCheckbox] = React.useState(false);
	const list = (valueCheckbox
		? JSON.parse(localStorage.getItem("foundSaveMovies"))
		: JSON.parse(localStorage.getItem("saveMovies"))) || [];

		console.log(list);
	function onCheckboxChange() {
		// console.log(JSON.parse(localStorage.getItem("savedList")));
		setValueCheckbox(!valueCheckbox);
		onClick(list, "save-movies", !valueCheckbox);
	}
	React.useEffect(() => {
		setData(false);
	}, [data]);
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
					setData={setData}
					isData={data}
					onCheckboxChange={onCheckboxChange}
				/>
				{preloader ? (
					<Preloader />
				) : (
					<MoviesCardList
					isData={data}
					setData={setData}
					onDeleteMovies={onDeleteMovies}
					list={list}
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
