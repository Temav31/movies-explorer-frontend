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
import {
	MOVIES_LIMIT,
	SMALL_WIDTH,
	MEDIUM_WIDTH,
	BIG_WIDTH,
	SMALL_SEARCH,
	MEDIUM_SEARCH,
	BIG_SEARCH,
	SMALL_ADD_MOVIES,
	ADD_MOVIES,
} from "../../utils/constant";


const Movies = (props) => {
	const {
		isLogin,
		preloader,
		onAddMovies,
		onDeleteMovies,
		onClick,
		onSearch,
		data,
		setData,
	} = props;

	const [valueCheckbox, setValueCheckbox] = React.useState(JSON.parse(localStorage.getItem("status")));
	const [list, setList] = React.useState([]);

	function onCheckboxChange() {
		setValueCheckbox(!valueCheckbox);
		onClick(list, "movies", !valueCheckbox);
	};
	React.useEffect(() => {
		setData(false);
		setList((valueCheckbox
			? JSON.parse(localStorage.getItem("foundMovies"))
			: JSON.parse(localStorage.getItem("movies"))) || []);
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
					//  "" 
					<MoviesCardList
						isData={data}
						setData={setData}
						onAddMovies={onAddMovies}
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
export default Movies;
