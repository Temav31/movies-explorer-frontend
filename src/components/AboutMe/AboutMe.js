// импорт стилей
import "./AboutMe.css";
// 
import Author from "../../images/Author320.png"
import Portfolio from "../Portfolio/Portfolio"
import React from "react";
const AboutMe = () => {
	return (
		<section className="about-me">
				<h2 id="about-me" className="about-me__head">
					Студент
				</h2>
			<div className="about-me__container">
				<img className="about-me__image" src={Author} alt="Фото автора" />
				<div className="about-me__text-container">
					<h3 className="about-me__title">
						Артём
					</h3>
					<p className="about-me__text">
						Фронтенд-разработчик, 20 лет
					</p>
					<p className="about-me__text-description">
						Я родился и живу в Саратове, закончил факультет экономики СГУ.
						У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
						Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
						После того, как прошёл курс по веб-разработке, начал заниматься
						фриланс-заказами и ушёл с постоянной работы.
					</p>
					<a className="about-me__link" href="https://github.com/Temav31?tab=repositories" target="_blank" rel="noopener noreferrer">
						Github
					</a>
				</div>
			</div>
			<Portfolio />
		</section>
	);
};
export default AboutMe;
