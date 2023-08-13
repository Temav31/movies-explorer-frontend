// импорт стилей
import "./Navigation.css";

import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<>
			<div className="navigation__container-movie">
				<Link className="navigation__link-movie" to="/movies">
				Фильмы
				</Link>
				<Link className="navigation__link" to="/saved-movies">
				Сохранённые фильмы
				</Link>
			</div>
			<div className="navigation__container">
				<Link className="navigation__author" to="/profile">
				Аккаунт
				</Link>
			</div>
		</>
	);
};
export default Navigation;
