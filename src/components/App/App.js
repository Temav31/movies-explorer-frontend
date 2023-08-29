import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
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
	// авторизация 
	const [authoriz, setАuthoriz] = React.useState(false);
	// фильмы 
	const [moviesList, setMoviesList] = React.useState([]);
	const [searchMoviesList, setSearchMoviesList] = React.useState([]);
	// 
	const [saveMovies, setSaveMovies] = React.useState([]);
	const [saveList, setSaveList] = React.useState([]);
	// загрузка
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [errorMovies, setErrorMovies] = useState("");
	const [saveFoundMovies, setSaveFoundMovies] = React.useState([]);
	// пользователь
	const [currentUser, setCurrentUser] = useState({
		name: '',
		email: '',
		_id: '',
	});
	React.useEffect(() => {
		if (!localStorage.getItem("token")) {
			handleExit();
		}
	}, []);
	// авторизация 
	function handleLogin(dataLog) {
		AuthorApi.login(dataLog)
			.then((data) => {
				if (data.token) {
					console.log(data.token);
					setАuthoriz(true);
					localStorage.setItem("token", data.token);
					checkToken();
					navigate("/movies");
				}
			})
			.catch((err) => {
				console.log(err);
			})
	};
	// регистрация 
	function handleRegister(data) {
		AuthorApi.registration(data)
			.then(() => {
				handleLogin({
					email: data.email,
					password: data.password,
				});
				navigate("/movies");
			})
			.catch((err) => {
				console.log(err);
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
					// console.log(currentUser);
					setАuthoriz(true);
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		}
	};
	const handleExit = () => {
		setАuthoriz(false);
		localStorage.clear();
		navigate("/");
		setMoviesList([]);
		setSearchMoviesList([]);
		setMoviesList([]);
	};
	// функции для редактирования данных
	function handleUpdateUser(newData) {
		// console.log(newData);
		MainApi.setUserInfo(newData)
			.then((data) => {
				setCurrentUser({
					name: data.name,
					email: data.email
				});

			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	};
	// работа с карточками 
	React.useEffect(() => {
		let id = currentUser._id;
		if (id && authoriz !== "") {
			handleSaveMovies();
		}
	}, [currentUser, authoriz]);

	// 
	React.useEffect(() => {
		let data = localStorage.getItem("foundMovies");
		let checkbox = localStorage.getItem("status");
		if (data && checkbox) {
			const value = JSON.parse(checkbox);
			handleCheckbox(value);
		}
	}, []);
	//
	React.useEffect(() => {
		let data = localStorage.getItem("loadMovies");
		if (JSON.parse(data)) {
			if (data) {
				setMoviesList(JSON.parse(data));
			}
		}
	}, []);
	// функция поиска фильмов
	function handleSearchFilm(film, value) {
		const short = moviesList.length;
		setErrorMovies("");
		if (short === 0) {
			console.log("получение фильмоф");
			setLoading(true);
			MoviesApi.getMovies()
				.then((data) => {
					const foundMovies = data.filter((item) => item.nameRU.toLowerCase().includes(film.toLowerCase()));
					// console.log(foundMovies);					
					if (foundMovies.lenght !== 0) {
						setSearchMoviesList(foundMovies);
						localStorage.setItem('name', film);
						localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
						localStorage.setItem('status', JSON.stringify(value));
						localStorage.setItem('loadMovies', JSON.stringify(data));
					} else {
						setErrorMovies("Ничего не найдено");
					}
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				})
				.finally(() => {
					setLoading(false);
				})
		} else {
			console.log('поиск фильмов');
			const foundMovies = moviesList.filter((item) => item.nameRU.toLowerCase().includes(film.toLowerCase()));
			const number = foundMovies.length;
			if (number === 0) {
				setErrorMovies("Ничего не найдено");
				setSearchMoviesList(foundMovies);
			} else {
				localStorage.setItem('name', film);
				localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
				localStorage.setItem('status', JSON.stringify(value));

				setSearchMoviesList(foundMovies);
				console.log(foundMovies.lenght);
			}
		}
	};
	// функция проверка короткометраждек в сохр фильмах
	function handleCheckbox(value) {
		let film = JSON.parse(localStorage.getItem('foundMovies'))
		if (value) {
			setSearchMoviesList(film.filter((movie) => movie.duration < LENGHT_MOVIE));
		}
		else {
			setSearchMoviesList(film);
		}
		localStorage.setItem('status', JSON.stringify(value));
	};
	// функция добавления фильма
	function handleAddMovie(data) {
		console.log("сохранение");
		MainApi.addMovie(data)
			.then((newMovie) => {
				// console.log(saveMovies);
				setSaveMovies(saveMovies.concat(newMovie));
				setSaveList(saveList.concat(newMovie));
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	};
	// функция удаления фильмов
	function handleDeleteMovies(movie) {
		console.log("удаление");
		MainApi.removeMovie(movie._id)
			.then(() => {
				setSaveMovies(saveMovies.filter((c) => c._id !== movie._id));
				setSaveList(saveList.filter((c) => c._id !== movie._id));
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	};
	// функция получения сохранёных фильмов
	const handleSaveMovies = () => {
		MainApi.getMoviesList()
			.then((data) => {
				setSaveList(data.filter((c) => c.owner === currentUser._id));
				setSaveMovies(data.filter((c) => c.owner === currentUser._id));
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	};
	// функция поиска в сохрангённых фильмах
	function handleSaveSearchFilm(film) {
		setLoading(true);
		console.log(saveMovies);
		console.log(saveList);
		setError("");
		const foundMovies = saveList.filter((item) => item.nameRU.toLowerCase().includes(film.toLowerCase()));
		if (foundMovies.length !== 0) {
			setLoading(false);
			setSaveFoundMovies(foundMovies);
			setSaveMovies(foundMovies);
			setError("");
		} else {
			setLoading(false);
			setSaveMovies([]);
			setError("Ничего не найдено");
		}
	};
	// функция проверка короткометраждек в сохр фильмах
	function handleSaveCheckbox(value) {
		if (value) {
			setSaveMovies(saveMovies.filter((movie) => movie.duration < LENGHT_MOVIE));
		} else
			if (saveFoundMovies.length === 0) {
				setSaveMovies(saveList);
			} else {
				setSaveMovies(saveFoundMovies);
			}
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
						element={authoriz ? <Navigate to="/" /> : <Login isLogin={handleLogin} />}
					// element={<Login isLogin={handleLogin} />}
					/>
					<Route
						path="/signup"
						element={authoriz ? <Navigate to="/" /> : <Register isRegister={handleRegister} />}
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
								element={Movies}
								isAddMovies={handleAddMovie}
								isDeleteMovies={handleDeleteMovies}
								isClick={handleCheckbox}
								isSearch={handleSearchFilm}
								isSave={saveList}
								isFound={searchMoviesList}
								preloader={loading}
								message={errorMovies}
							/>
						}
					/>
					<Route
						path="/saved-movies/*"
						element={
							<ProtectedRoute
								// isLogin={true}
								isLogin={authoriz}
								element={SavedMovies}
								// isAddMovies={handleAddMovie}
								isDeleteMovies={handleDeleteMovies}
								// isClick={handleCheckbox}
								// isSearch={handleSearchFilm}
								isClick={handleSaveCheckbox}
								isSearch={handleSaveSearchFilm}
								isSave={saveMovies}
								isFound={searchMoviesList}
								preloader={loading}
								message={error}
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
							/>
						}
					/>
				</Routes>
			</div>
		</CurrentUserContext.Provider>
	);
};
export default App;
