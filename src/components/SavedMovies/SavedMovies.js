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
		saveMovies
	} = props;
	const [valueCheckbox, setValueCheckbox] = React.useState(false);
	const [list, setList] = React.useState([]);

	function onCheckboxChange() {
		setValueCheckbox(!valueCheckbox);
		onClick(saveMovies, "saved-movies", !valueCheckbox);
	};
	// React.useEffect(() => {
	// 	// console.log("dfjibghvfdrio");
	// 	setData(false);
	// 	setList((valueCheckbox
	// 		? JSON.parse(localStorage.getItem("foundSaveMovies"))
	// 		: JSON.parse(localStorage.getItem("saveMovies"))) || []);
	// }, [data]);
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
					list={saveMovies}
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
