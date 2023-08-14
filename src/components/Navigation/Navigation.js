// импорт стилей
import "./Navigation.css";

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
	const location = useLocation();
	return (
		<>
			<div className="navigation__container-movie">
				<Link className={`navigation__link-movie 
				${location.pathname === "/"
						? "navigation__text"
						: ""
					}`} to="/movies">
					Фильмы
				</Link>
				<Link className={`navigation__link 
				${location.pathname === "/"
						? "navigation__text"
						: ""
					}`} to="/saved-movies">
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
