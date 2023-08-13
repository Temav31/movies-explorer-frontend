// импорт стилей
import "./NotFound.css";

import React from "react";
// для перемещения
import { Link } from "react-router-dom"

const NotFound = () => {
	return (
		<section className="not-found">
			<h1 className="not-found__head">
				404
			</h1>
			<p className="not-found__text">
				Страница не найдена
			</p>
			<Link className="not-found__link" to="/">
				Назад
			</Link>
		</section>
	);
};
export default NotFound;
