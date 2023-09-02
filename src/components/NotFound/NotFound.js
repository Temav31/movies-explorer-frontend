// импорт стилей
import "./NotFound.css";

import React from "react";
// для перемещения
// import { Link } from "react-router-dom"
import {useNavigate} from 'react-router-dom';

const NotFound = () => {
	const history = useNavigate();
	return (
		<section className="not-found">
			<h1 className="not-found__head">
				404
			</h1>
			<p className="not-found__text">
				Страница не найдена
			</p>
			<button className="not-found__link" type='button' onClick={() => history(-2)}>
				Назад
			</button>
		</section>
	);
};
export default NotFound;
