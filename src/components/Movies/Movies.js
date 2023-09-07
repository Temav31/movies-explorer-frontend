import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// загрузка
import Preloader from "../Preloader/Preloader";


const Movies = (props) => {
	const {
		isLogin,
		preloader,
		onAddMovies,
		onDeleteMovies,
		onSearch,
		data,
		setData,
		movies,
		moviesShort,
	} = props;

	const [valueCheckbox, setValueCheckbox] = useState(false);
	const [name, setName] = useState(localStorage.getItem('name') ?? '');

	const [visibleMovies, setVisibleMovies] = useState([]);
	useEffect(() => {
		if (!name) {
			return setVisibleMovies([]);
		} else if (movies.length === 0) {
			return onSearch(name);
		};
		if (valueCheckbox) {
			setVisibleMovies(moviesShort);
		} else {
			setVisibleMovies(movies);
		}


	}, [movies, moviesShort, valueCheckbox]);

	useEffect(() => {
		localStorage.setItem('foundMovies', JSON.stringify(visibleMovies));
	}, [visibleMovies]);


	useEffect(() => {
		const lastSearchCheckboxState = localStorage.getItem("status");
		if (lastSearchCheckboxState === 'true') setValueCheckbox(true);
	}, []);


	const handleOnSearch = (value) => {
		setName(value);
		onSearch(value);
	}



	function onCheckboxChange() {
		setValueCheckbox(!valueCheckbox);
		localStorage.setItem("status", !valueCheckbox);
	};

	return (
		<>
			<Header
				isLogin={isLogin}
			/>
			{/* Основной блок */}
			<main>
				<SearchForm
					searchValue={name}
					onSearch={handleOnSearch}
					valueCheckbox={valueCheckbox}
					onCheckboxChange={onCheckboxChange}
				/>
				{preloader ? (
					<Preloader />
				) : (
					//  "" 
					<MoviesCardList
						name={name}
						isData={data}
						setData={setData}
						onAddMovies={onAddMovies}
						onDeleteMovies={onDeleteMovies}
						list={visibleMovies}
					/>
				)
				}
				{/* {showMore && <MoviesButton onClick={handleAddMovie} />} */}
			</main>
			{/* Конец основного блока */}
			<Footer />
		</>
	);
};
export default Movies;
