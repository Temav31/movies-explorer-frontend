import { useEffect, useState } from 'react';
import {
	Route,
	Routes,
	useNavigate,
	Navigate,
	useLocation
} from 'react-router-dom';
// стили 
import "./App.css";
// импорт основных блоков
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
// работа с апи
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
// апи
import AuthorApi from "../../utils/AuthorApi";
import MainApi from "../../utils/MainApi";
import MoviesApi from "../../utils/MoviesApi";
// контекст
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// константы
import { LENGHT_MOVIE } from '../../utils/constant';
import { toBeRequired } from '@testing-library/jest-dom/matchers';
const App = () => {
	// навигация 
	const navigate = useNavigate();
	// авторизация 
	const [authoriz, setAuthoriz] = useState(false);
	// фильмы 
	const [searchValue, setSearchValue] = useState(localStorage.getItem('name') ?? '');
	const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies') ?? '[]'));
	// 
	const [saveMovies, setSaveMovies] = useState([]);
	// загрузка
	const [isInitApp, setInitApp] = useState(true);
	const [loading, setLoading] = useState(false);
	const [foundMoveis, setFoundMoveis] = useState(JSON.parse(localStorage.getItem('foundMoveis') ?? '[]'));
	const [foundSaveMoveis, setFoundSaveMoveis] = useState([]);
	const [foundMoveisShort, setFoundMoveisShort] = useState([]);
	const [saveMoviesShort, setSaveMoviesShort] = useState([]);
	// ошибки регистрации и авторизации
	const [errorMessage, setErrorMessage] = useState("");
	const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
	// блокировка формы
	const [formBlock, setFormBlock] = useState(false);

	// пользователь 
	const [currentUser, setCurrentUser] = useState({
		name: '',
		email: '',
		_id: '',
	});
	// закрытие попапа
	function closePopup() {
		// setErrorMessage("");
		setIsInfoTooltipPopupOpen(false);
	}

	// авторизация 
	function handleLogin(dataLog) {
		setFormBlock(true);
		AuthorApi.login(dataLog)
			.then((data) => {
				if (data.token) {
					console.log("авторизация");
					localStorage.setItem("token", data.token);
					setAuthoriz(true);
					checkToken();
					navigate("/movies");
					setErrorMessage("");
				}
			})
			.catch((err) => {
				let errMessage = 'Произошла ошибка на сервере';
				if (err === 401) errMessage = 'Неправильные данные';
				setErrorMessage(errMessage);
				setIsInfoTooltipPopupOpen(true);
			})
			.finally(() => {
				setFormBlock(false);
			});
	};
	// регистрация 
	function handleRegister(data) {
		setFormBlock(true);
		AuthorApi.registration(data)
			.then(() => {
				handleLogin({
					email: data.email,
					password: data.password,
				});
			})
			.catch((err) => {
				let errMessage = 'Произошла ошибка на сервере';
				if (err === 400) errMessage = 'Неправильные данные';
				if (err === 409) errMessage = 'Пользователь с такой почтой уже есть';
				setErrorMessage(errMessage);
				setIsInfoTooltipPopupOpen(true);
			})
			.finally(() => {
				setFormBlock(false);
			});
	};
	// приверка
	useEffect(() => {
		checkToken();
	}, []);
	
	const checkToken = () => {
		const token = localStorage.getItem("token");
		if (token) {
			MainApi.getProfile()
				.then((data) => {
					setCurrentUser(data);
					setAuthoriz(true);
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				})
				.finally(() => setInitApp(false))
		} else {
			setInitApp(false);
		}
	};
	// функции для редактирования данных
	function handleUpdateUser(newData) {
		setFormBlock(true);
		MainApi.setUserInfo(newData)
			.then((data) => {
				setErrorMessage("");
				setCurrentUser({
					name: data.name,
					email: data.email
				});
				setIsInfoTooltipPopupOpen(true);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
				let errMessage = 'Произошла ошибка на сервере';
				if (err === 400) errMessage = 'Не удалось обновить профиль. Неправильные данные';
				if (err === 409) errMessage = 'Пользователь с такой почтой уже есть';
				setErrorMessage(errMessage);
				setIsInfoTooltipPopupOpen(true);
			})
			.finally(() => {
				setFormBlock(false);
			});
	};
	const handleExit = () => {
		setAuthoriz(false);
		localStorage.clear();
		setCurrentUser({
			name: '',
			email: '',
			_id: '',
		});
	};
	// валимт
	// работа с карточками 
	useEffect(() => {
		if (!authoriz) {
			return;
		}
		setLoading(true);
		console.log("фильмы");
		MainApi.getMoviesList()
			.then((savedMovies) => {
				const list = savedMovies.filter((item) => {
					return item.owner === currentUser._id;
				});
				setSaveMovies(savedMovies);
				setFoundSaveMoveis(savedMovies);
				localStorage.setItem("saveMovies", JSON.stringify(list));
			})
			.catch((err) => {
				console.log(err.stack);
				console.log(`Ошибка: ${err}`);
			})
			.finally(() => {
				setLoading(false);
			})
	}, [authoriz]);

	function searchMoveis(movies, keyWord) {
		return movies.filter((item) => {
			const isRuName = item.nameRU.toLowerCase().includes(keyWord.toLowerCase());
			const isEnName = item.nameEN.toLowerCase().includes(keyWord.toLowerCase());
			return isRuName || isEnName
		})
	};

	// функция фильтрации короткометраждек в фильмах
	function filterShortMovies(filteredMovies) {
		return filteredMovies.filter((film) => film.duration < LENGHT_MOVIE);
	}

	function getMovies() {
		MoviesApi.getMovies()
			.then(films => {
				const newMovis = films.map((movie) => {
					return {
						...movie,
						isSave: Boolean(
							saveMovies.find((item) => item.movieId === movie.id)
						),
					}
				});
				setMovies(newMovis);
				localStorage.setItem('movies', JSON.stringify(newMovis));

			})
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		if (!authoriz || movies.length === 0) return;
		handleSearchFilm(searchValue)
	}, [movies])

	// функция поиска фильмов
	function handleSearchFilm(keyWord) {
		setLoading(true);
		if (movies.length < 1) return getMovies();
		localStorage.setItem('name', keyWord);
		setSearchValue(keyWord);
		setLoading(false);
		console.log("поиск");

		if (!keyWord) return setFoundMoveis([]);
		
		const list = searchMoveis(movies, keyWord);
		setFoundMoveis(list);
	};
	
	useEffect(() => {
		localStorage.setItem('foundMoveis', JSON.stringify(foundMoveis));
		const shortList = filterShortMovies(foundMoveis);
		setFoundMoveisShort(shortList);
	}, [foundMoveis])


	// функция поиска в сохрангённых фильмах
	function handleSaveSearchFilm(keyWord) {
		const list = searchMoveis(saveMovies, keyWord);

		localStorage.setItem('saveName', keyWord);
		setFoundSaveMoveis(list);
		localStorage.setItem('saveMovies', JSON.stringify(list));
	};

	useEffect(() => {
		const shortList = filterShortMovies(foundSaveMoveis);
		setSaveMoviesShort(shortList);
	}, [foundSaveMoveis]);

	function checkIsSave (movieId, movies) {
		return movies.some(movie => {
			console.log(movie.movieId === movieId);
			return movie.movieId === movieId;
		})
 }
	// функция добавления фильма
	function handleAddMovie(movie) {
		console.log("сохранение");
		MainApi.addMovie(movie)
			.then((newMovie) => {
				const newSavedMovie = [...saveMovies, newMovie]
				setSaveMovies(newSavedMovie);
				setErrorMessage("");

				handleChangeSave(newMovie.movieId, true)

				setMovies(movies.map((_movie) => {
					return {
						..._movie,
						isSave: checkIsSave(_movie.id,  newSavedMovie)
					}
				}))

				localStorage.setItem("movies", JSON.stringify(movies))
				localStorage.setItem("saveMovies", JSON.stringify(saveMovies))
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	};
	// функция удаления фильмов
	function handleDeleteMovies(movie) {
		const id = movie._id ? movie._id : saveMovies.find((film => film.movieId === movie.id))._id;
		MainApi.removeMovie(id)
			.then((deleteMovie) => {
				console.log("удаление");
				const list = saveMovies.filter((film) => {
					return !film._id.includes(id);
				});
				setSaveMovies(list);
				setFoundSaveMoveis(state => state.filter(film => film._id !== id))

				setMovies(movies.map((_movie) => {
					return {
						..._movie,
						isSave: checkIsSave(_movie.id,  list)
					}
				}))

				setSaveMovies(list);
				handleChangeSave(deleteMovie.movieId, false);
			}).catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.catch((err) => {
				console.log(err)
			});
	};
	
	// функция получения сохранёных фильмов
	function handleChangeSave(id, isLike) {
		console.log("change");

		const newMovieList = JSON.parse(localStorage.getItem("movies")).map(
			(item) =>
			({
				...item,
				isSave: item.id === id,
			})
		);

		localStorage.setItem("movies", JSON.stringify(newMovieList));
		return newMovieList
	};

	if (isInitApp) return(<></>)

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Routes>
					<Route
						path="/"
						element={<Main
							isLogin={true}
						/>}
					/>
					<Route
						path="/signin"
						element={authoriz ? <Navigate to="/" /> : <Login isLogin={handleLogin} block={formBlock} />}
					// element={<Login isLogin={handleLogin} />}
					/>
					<Route
						path="/signup"
						element={authoriz ? <Navigate to="/" /> : <Register isRegister={handleRegister} block={formBlock} />}
					// element={<Register isRegister={handleRegister} />}
					/>
					<Route
						path="/movies"
						element={
							<ProtectedRoute
								isLogin={true}
								// isLogin={authoriz}
								preloader={loading}
								element={Movies}
								onAddMovies={handleAddMovie}
								onDeleteMovies={handleDeleteMovies}
								onSearch={handleSearchFilm}
								movies={foundMoveis}
								moviesShort={foundMoveisShort}
							/>
						}
					/>
					<Route
						path="/saved-movies"
						element={
							<ProtectedRoute
								isLogin={true}
								// isLogin={authoriz}
								preloader={loading}
								element={SavedMovies}
								onDeleteMovies={handleDeleteMovies}
								onSearch={handleSaveSearchFilm}
								saveMovies={foundSaveMoveis}
								saveMoviesShort={saveMoviesShort}
							/>
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute
								isLogin={true}
								// isLogin={authoriz}
								element={Profile}
								isExite={handleExit}
								onUpdateUser={handleUpdateUser}
								block={formBlock}
							/>
						}
					/>
					<Route
						path="/*"
						element={<NotFound />}
					/>
				</Routes>
				<InfoTooltip
					isOpen={isInfoTooltipPopupOpen}
					onClose={closePopup}
					result={errorMessage}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
};
export default App;
