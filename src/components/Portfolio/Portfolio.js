// импорт стилей
import "./Portfolio.css";
// импорт изображения
import Arrow from "../../images/Strelka.svg"
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
					<a className="portfolio__link" href="https://github.com/Temav31/how-to-learn" target="_blank" rel="noopener noreferrer">
						<p className="portfolio__text">
							Статичный сайт
						</p>
						<img className="portfolio__image" src={Arrow} alt="Стрелка" />
					</a>
				</li>
				<li className="portfolio__item">
					<a className="portfolio__link" href="https://github.com/Temav31/russian-travel" target="_blank" rel="noopener noreferrer">
						<p className="portfolio__text">
							Адаптивный сайт
						</p>
						<img className="portfolio__image" src={Arrow} alt="Стрелка" />
					</a>
				</li>
				<li className="portfolio__item">
					<a className="portfolio__link portfolio__link-last" href="https://github.com/Temav31/react-mesto-api-full-gha" target="_blank" rel="noopener noreferrer">
						<p className="portfolio__text">
							Одностраничное приложение
						</p>
						<img className="portfolio__image" src={Arrow} alt="Стрелка" />
					</a>
				</li>
			</ul>
		</div>
	);
};
export default Portfolio;
