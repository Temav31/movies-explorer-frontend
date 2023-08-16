import React from "react";
import { Route, Routes } from "react-router-dom";
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
const App = () => {
	return (
		<div className="page">
			<Routes>
				<Route
					path="/"
					element={<Main />}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
				<Route
					path="/signin"
					element={<Login />}
				/>
				<Route
					path="/signup"
					element={<Register />}
				/>
				<Route
					path="/movies"
					element={<Movies />}
				/>
				<Route
					path="/profile"
					element={<Profile />}
				/>
				<Route
					path="/saved-movies"
					element={<SavedMovies />}
				/>
			</Routes>
		</div>
	);
};
export default App;
