// импорт стилей
import "./Portfolio.css";
// импорт изображения
import Arrow from "../../images/Portfolio.png"
// 
import React from "react";
const Portfolio = () => {
	return (
		<div className="portfolio">
			<h3 className="portfolio__head">
				Портфолио
			</h3>
			<ul className="portfolio__container"> 
				<li className="portfolio__item">
					<a className="portfolio__link" href="https://github.com/Temav31/how-to-learn">
					Статичный сайт
					</a>
					<img className="portfolio__image" src={Arrow} alt="Стрелка"/>
				</li>
				<li className="portfolio__item">
					<a className="portfolio__link" href="https://github.com/Temav31/russian-travel">
					Адаптивный сайт
					</a>
					<img className="portfolio__image" src={Arrow} alt="Стрелка"/>
				</li>
				<li className="portfolio__item">
					<a className="portfolio__link" href="https://github.com/Temav31/russian-travel">
					Одностраничное приложение
					</a>
					<img className="portfolio__image" src={Arrow} alt="Стрелка"/>
				</li>
			</ul>
		</div>
	);
};
export default Portfolio;
