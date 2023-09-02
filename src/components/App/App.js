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
	// const [error, setError] = useState("");
	// const [errorMovies, setErrorMovies] = useState("");
	// const [saveFoundMovies, setSaveFoundMovies] = React.useState([]);
	// ошибки регистрации и авторизации
	const [errorMessage, setErrorMessage] = React.useState("");
	const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
	// блокировка формы
	const [formBlock, setFormBlock] = useState(false);
	const [data, setData] = useState(false);
	// пользователь 
	const [currentUser, setCurrentUser] = useState({
		name: '',
		email: '',
		_id: '',
	});
	// закрытие попапа
	function closePopup() {
		setIsInfoTooltipPopupOpen(false);
		setErrorMessage("");
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
		setErrorMessage("");
		MainApi.setUserInfo(newData)
			.then((data) => {
				setCurrentUser({
					name: data.name,
					email: data.email
				});
				setIsInfoTooltipPopupOpen(true);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
				setErrorMessage(err.message);
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

	// работа с карточками 
	React.useEffect(() => {
		if (!currentUser) {
			return;
		}
		setLoading(true);

		console.log("фильмы");
		Promise.all([MoviesApi.getMovies(), MainApi.getMoviesList()])
			.then(([films, savedMovies]) => {
				const list = savedMovies.filter((item) => {
					return item.owner === currentUser._id;
				});

				setSaveMovies(list);
				localStorage.setItem("saveMovies", JSON.stringify(list));

				setMovies(films.map((movie) => {
					return {
						...movie,
						isSave: Boolean(list.find((item) =>
						item.nameRU === movie.nameRU
					)),
					}
				}));
				setData(true);
				console.log(list);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(() => {
				setLoading(false);
			})
	}, [currentUser]);

	// функция поиска фильмов
	function handleSearchFilm(film) {
		setLoading(true);
		console.log("поиск");
		const list = movies.filter((item) => item.nameRU.toLowerCase().includes(film.toLowerCase()));
		const shortList = list.filter(((movie) => movie.duration < LENGHT_MOVIE));
		setData(true);

		localStorage.setItem('name', film);
		localStorage.setItem('movies', JSON.stringify(list));
		localStorage.setItem('foundMovies', JSON.stringify(shortList));
		setTimeout(setLoading(false), 100);
	};
	// функция проверка короткометраждек в сохр фильмах
	function handleCheckbox(movies, namePage, value) {
		const film = movies.filter((film) => film.duration < LENGHT_MOVIE);
		const saveFilm = saveMovies.filter((film) => film.duration < LENGHT_MOVIE);
		setData(true);

		if (namePage === "save-movies") {
			localStorage.setItem("foundMovies", JSON.stringify(film));
			localStorage.setItem("status", value);
		} else {
			localStorage.setItem("foundSaveMovies", JSON.stringify(saveFilm));
			// localStorage.setItem("status", value);
		}
	};
	// функция добавления фильма
	function handleAddMovie(data) {
		setErrorMessage("");
		console.log("сохранение");
		async function AddMovie()
		{
			try {
				const newMovie = await MainApi.addMovie(data)
				const value = JSON.parse(localStorage.getItem("status"));
				value ? handleCheckSave(newMovie.movieId, true) : handleChangeSave(newMovie.movieId, true)
				setData(true);
				return true;
			} catch (err) {
				console.log(`Ошибка: ${err}`);
				setErrorMessage(`Карточку не удалось сохранить, ошибка ${err}`);
				setIsInfoTooltipPopupOpen(true);
				return false;
			}
		}
		return AddMovie()
	};
	// функция удаления фильмов
	function handleDeleteMovies(movie) {
		setErrorMessage("");
		console.log("удаление");
		let id;
		movie.id
			? saveMovies.find((item) => {
				if (item.nameRU.includes(movie.nameRU)) return (id = item._id);
				else return (id = "");
			})
			: (id = movie._id);
		async function DeleteMovie()
		{
			try {
				const deleteMovie = await MainApi.removeMovie(id)
				const list = saveMovies.filter((film) => {
					return !film._id.includes(id);
				});
				setSaveMovies(list);
				localStorage.setItem("saveMovies", JSON.stringify(list));

				const pageValue = JSON.parse(localStorage.getItem("status"));
				if (pageValue) {
					handleCheckSave(deleteMovie.movieId, false);
				} else {
					handleChangeSave(deleteMovie.movieId, false);
				}
				setData(true);
				return false;
			} catch (err) {
				console.log(`Ошибка: ${err}`);
				setErrorMessage(`Карточку не удалось удалить, ошибка ${err}`);
				setIsInfoTooltipPopupOpen(true);
				return true;
			}
		}
		return DeleteMovie()
	};
	// функция получения сохранёных фильмов
	function handleChangeSave(id, isLike)  {
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
			localStorage.setItem("foundSaveMovies", JSON.stringify(data));
		} else {
			localStorage.setItem("foundMovies", JSON.stringify(data));

		}
		return data
	};
	// функция поиска в сохрангённых фильмах
	function handleSaveSearchFilm(film) {
		const list = saveMovies.filter((item) => item.nameRU.toLowerCase().includes(film.toLowerCase()));
		setData(true);

		localStorage.setItem('saveName', film);
		localStorage.setItem('saveMovies', JSON.stringify(list));
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
								onClick={handleCheckbox}
								onSearch={handleSearchFilm}
								data={data}
								setData={setData}
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
