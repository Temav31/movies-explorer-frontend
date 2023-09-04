import React, { useEffect, useState } from "react";
import {
	Route,
	Routes,
	useNavigate,
	Navigate,
	useHistory,
	useLocation
} from "react-router-dom";
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
// import { patternUrl } from '../../utils/constant';
const App = () => {
	// навигация 
	const navigate = useNavigate();
	const local = useLocation();
	// авторизация 
	const [authoriz, setАuthoriz] = React.useState(false);
	const [newList, setNewList] = React.useState([]);
	// фильмы 
	const [movies, setMovies] = React.useState([]);
	// const [searchMoviesList, setSearchMoviesList] = React.useState([]);
	// 
	const [saveMovies, setSaveMovies] = React.useState([]);
	// const [saveList, setSaveList] = React.useState([]);
	// загрузка
	const [loading, setLoading] = useState(false);
	const [foundMoveis, setFoundMoveis] = useState([]);
	const [foundSave, setFoundSave] = useState([]);
	const [foundMoveisShort, setFoundMoveisShort] = useState([]);
	const [foundSaveShort, setFoundSaveShort] = useState([]);
	const [film, setFilm] = useState([]);
	const [save, setSave] = useState("");
	const [name, setName] = useState(localStorage.getItem('name'));
	const [nameSave, setNameSave] = useState(localStorage.getItem('saveName'));
	// const [saveFoundMovies, setSaveFoundMovies] = React.useState([]);
	// ошибки регистрации и авторизации
	const [errorMessage, setErrorMessage] = React.useState("");
	const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
	// блокировка формы
	const [formBlock, setFormBlock] = useState(false);
	const [data, setData] = useState(false);
	const [valueCheckbox, setValueCheckbox] = React.useState(localStorage.getItem("status"));
	// console.log(valueCheckbox)


	const [start, setStart] = useState(true);
	// пользователь 
	const [currentUser, setCurrentUser] = useState({
		name: '',
		email: '',
		_id: '',
	});
	// закрытие попапа
	function closePopup() {
		setIsInfoTooltipPopupOpen(false);
		// setErrorMessage("");
	}
	React.useEffect(() => {
		if (!localStorage.getItem("token")) {
			handleExit();
		}
	}, []);
	// авторизация 
	function handleLogin(dataLog) {
		setFormBlock(true);
		AuthorApi.login(dataLog)
			.then((data) => {
				if (data.token) {
					console.log("авторизация");
					localStorage.setItem("token", data.token);
					setАuthoriz(true);
					checkToken();
					navigate("/movies");
					setErrorMessage("");
				}
			})
			.catch((err) => {
				// console.log(err);
				setErrorMessage(err.message);
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
				setErrorMessage("Пользователь с такой почтой уже есть");
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
		const place = local.pathname;
		if (token) {
			MainApi.getProfile()
				.then((data) => {
					setCurrentUser(data);
					setАuthoriz(true);
					["/signin", "/signup"].includes(place)
						? navigate("/movies")
						: navigate();
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		};
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
				setErrorMessage(`Не удалось обновить профиль. ${err}`);
				setIsInfoTooltipPopupOpen(true);
			})
			.finally(() => {
				setFormBlock(false);
			});
	};
	const handleExit = () => {
		setАuthoriz(false);
		localStorage.clear();
		navigate("/");
		setCurrentUser({
			name: '',
			email: '',
			_id: '',
		});
	};
	// валимт
	// работа с карточками 
	React.useEffect(() => {
		if (!currentUser) {
			return;
		}
		setLoading(true);
		console.log("фильмы");
		Promise
			.all([MoviesApi.getMovies(), MainApi.getMoviesList()])
			.then(([films, savedMovies]) => {
				const list = savedMovies.filter((item) => {
					return item.owner === currentUser._id;
				});

				setSaveMovies(list);
				setFoundSave(list);
				setSave(list);
				localStorage.setItem("saveMovies", JSON.stringify(list));

				setMovies(films.map((movie) => {
					return {
						...movie,
						isSave: Boolean(
							list.find((item) => item.movieId === movie.id)
						),
					}
				}));
				setFilm(movies);
				localStorage.setItem('movies', JSON.stringify(movies));
				setFoundMoveis(movies);
				setData(true);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(() => {
				setLoading(false);
			})
		// setTimeout(handleGet(), 4000);
	}, [currentUser]);
	// function handleGet() {
	// 	console.log("hi")
	// 	console.log(movies)
	// }

	// функция поиска фильмов
	function handleSearchFilm(film) {
		setLoading(true);
		localStorage.setItem('name', film);
		console.log("поиск");
		let list;
		let shortList
		if (valueCheckbox) {
			list = movies.filter((item) => item.nameRU.toLowerCase().includes(film.toLowerCase()));
			shortList = list.filter(((movie) => movie.duration < LENGHT_MOVIE));
		} else {
			shortList = movies.filter((item) => item.nameRU.toLowerCase().includes(film.toLowerCase()));
		}
		setName(film);
		setFoundMoveis(shortList);
		setFoundMoveisShort(shortList);
		setFilm(shortList);
		setLoading(false);
		localStorage.setItem('movies', JSON.stringify(list));
		localStorage.setItem('foundMovies', JSON.stringify(shortList));
		setStart(false);
		setData(true);
	};
	// функция проверка короткометраждек в сохр фильмах
	function handleCheckbox(value) {
		console.log(nameSave)
		// let list;
		// let film;
		// if (nameSave === "") {
		// 	film = saveMovies.filter((film) => film.duration < LENGHT_MOVIE);
		// 	list = saveMovies;
		// } else {
		// 	list = saveMovies.filter((item) => item.nameRU.toLowerCase().includes(nameSave.toLowerCase()));
		// 	film = list.filter((film) => film.duration < LENGHT_MOVIE);
		// }
		const saveFilm = foundSave.filter((film) => film.duration < LENGHT_MOVIE);

		console.log(saveFilm)
		if (value === true) {
			// console.log("hi");
			setSave(saveFilm);
		}
		else {
			setSave(foundSave);
		}
		localStorage.setItem("foundSaveMovies", JSON.stringify(foundSave));
		// localStorage.setItem("statusSave", value);
		setData(true);
	};
	function handleCheckboxMovies(value) {
		console.log(name)
		let list;
		let film;
		if (name === "") {
			film = movies.filter((film) => film.duration < LENGHT_MOVIE);
			list = movies;
		} else {
			list = movies.filter((item) => item.nameRU.toLowerCase().includes(name.toLowerCase()));
			film = list.filter((film) => film.duration < LENGHT_MOVIE);
		}
		if (value === true) {
			setFilm(film);
		}
		else {
			setFilm(list);
		}
		setValueCheckbox(!valueCheckbox)
		console.log(valueCheckbox)
		localStorage.setItem("foundMovies", JSON.stringify(film));
		// localStorage.setItem("status", false);
		setStart(false);
		setData(true);
	};
	// функция добавления фильма
	function handleAddMovie(data) {
		console.log("сохранение");
		MainApi.addMovie(data)
			.then((newMovie) => {
				setSave([...saveMovies, data]);
				setSaveMovies([...saveMovies, data]);
				setFoundSave(saveMovies);
				setFilm(film.map((_movie) => {
					return {
						..._movie,
						isSave: _movie.id === newMovie.movieId || _movie.isSave
					}
				}))
				setErrorMessage("");

				const value = localStorage.getItem("status");
				if (value)
					handleCheckSave(newMovie.movieId, true)
				else handleChangeSave(newMovie.movieId, true)

				setMovies(movies.map((_movie) => {
					return {
						..._movie,
						isSave: _movie.id === newMovie.movieId || _movie.isSave
					}
				}))
				setFoundMoveis(movies);

				// setFilm(movies)
				setData(true);
				localStorage.setItem("movies", JSON.stringify(movies))
				localStorage.setItem("saveMovies", JSON.stringify(saveMovies))
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	};
	// функция удаления фильмов
	function handleDeleteMovies(movie) {
		MainApi.getMoviesList()
			.then((_savedMovies) => {
				setErrorMessage("");
				let id;
				movie.id
					? _savedMovies.find((item) => {
						if (item.nameRU.includes(movie.nameRU)) {
							return (id = item._id)
						}
						else return (id = "");
					})
					: (id = movie._id);
				console.log(id)
				MainApi.removeMovie(id)
					.then((deleteMovie) => {
						console.log("удаление");
						const list = _savedMovies.filter((film) => {
							return !film._id.includes(id);
						});
						setSaveMovies(list);

						// setFoundSave(saveMovies);
						// localStorage.setItem("saveMovies", JSON.stringify(list));
						local.pathname === "saved-movie"
							? setMovies(movies.map((_movie) => {
								return {
									..._movie,
									isSave: _movie.nameRU === movie.nameRU ? !movie.isSave : _movie.isSave
								}
							}))
							: setMovies(movies.map((_movie) => {
								return {
									..._movie,
									isSave: _movie.nameRU === movie.nameRU ? false : _movie.isSave
								}
							}))

						local.pathname === "saved-movie"
							? setFilm(film.map((_movie) => {
								return {
									..._movie,
									isSave: _movie.nameRU === movie.nameRU ? !movie.isSave : _movie.isSave
								}
							}))
							: setFilm(film.map((_movie) => {
								return {
									..._movie,
									isSave: _movie.nameRU === movie.nameRU ? false : _movie.isSave
								}
							}))
						// const saveList = save.filter((film) => {
						// 	return !film._id.includes(id);
						// });
						setSave(list);

						setFoundMoveis(movie);
						setData(true);
						// localStorage.setItem("saveMovies", JSON.stringify(saveMovies));
						const pageValue = localStorage.getItem("status");
						if (pageValue) {
							handleCheckSave(deleteMovie.movieId, false);
						} else {
							handleChangeSave(deleteMovie.movieId, false);
						}
					}).catch((err) => {
						console.log(`Ошибка: ${err}`);
					})
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
		setData(true);
		return newMovieList
	};
	// функция получения сохранёных фильмов
	function handleCheckSave(user, save) {
		const page = local.pathname === "/saved-movies";
		let foundMovies = [];
		if (page) {
			foundMovies = localStorage.getItem("foundSaveMovies");
		} else {
			foundMovies = localStorage.getItem("foundMovies");
		}
		const list = JSON.parse(foundMovies);
		const data = list.map((film) =>
		({
			...film,
			isSave: film.id === user
		})
		);
		if (page) {
			localStorage.setItem("foundSaveMovies", JSON.stringify(movies));
		} else {
			localStorage.setItem("foundMovies", JSON.stringify(saveMovies));

		}
		setData(true);

		return data
	};
	// функция поиска в сохрангённых фильмах
	function handleSaveSearchFilm(film) {
		const list = saveMovies.filter((item) => item.nameRU.toLowerCase().includes(film.toLowerCase()));
		// const list = foundSave.filter((item) => item.nameRU.toLowerCase().includes(film.toLowerCase()));
		setNameSave(film);
		localStorage.setItem('saveName', film);
		setFoundSave(list);
		setFoundSaveShort(foundSave);
		setSave(list);
		console.log(list);
		localStorage.setItem('saveMovies', JSON.stringify(list));

		setData(true);
	};
	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Routes>
					<Route
						path="/"
						element={<Main
							isLogin={authoriz}
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
						path="*"
						element={<NotFound />}
					/>
					<Route
						path="/movies/*"
						element={
							<ProtectedRoute
								// isLogin={true}
								isLogin={authoriz}
								preloader={loading}
								element={Movies}
								onAddMovies={handleAddMovie}
								onDeleteMovies={handleDeleteMovies}
								onClick={handleCheckboxMovies}
								onSearch={handleSearchFilm}
								data={data}
								setData={setData}
								movies={film}
								value={start}
								list={movies}
							// message={errorMovies}
							/>
						}
					/>
					<Route
						path="/saved-movies/*"
						element={
							<ProtectedRoute
								// isLogin={true}
								isLogin={authoriz}
								preloader={loading}
								element={SavedMovies}
								data={data}
								setData={setData}
								onDeleteMovies={handleDeleteMovies}
								onClick={handleCheckbox}
								onSearch={handleSaveSearchFilm}
								saveMovies={save}
							/>
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute
								// isLogin={true}
								isLogin={authoriz}
								element={Profile}
								isExite={handleExit}
								onUpdateUser={handleUpdateUser}
								block={formBlock}
							/>
						}
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
