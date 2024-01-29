// импорт стилей
import "./AboutProject.css";

import React from "react";
const AboutProject = () => {
	return (
		<section className="about-project" id="about-project">
			<h2 className="about-project__head">
				О проекте
			</h2>
			<div className="about-project__about">
				<div >
					<h3 className="about-project__title">
						Дипломный проект включал 5 этапов
					</h3>
					<p className="about-project__text">
						Составление плана, работу над бэкендом, вёрстку,
						добавление функциональности и финальные доработки.
					</p>
				</div>
				<div>
					<h3 className="about-project__title">
					На выполнение диплома ушло 5 недель
					</h3>
					<p className="about-project__text">
						У каждого этапа был мягкий и жёсткий дедлайн,
						которые нужно было соблюдать, чтобы успешно защититься.
					</p>
				</div>
			</div>
			<div className="about-project__container">
				<div >
					<p className="about-project__button about-project__button-back">
						1 неделя
					</p>
					<p className="about-project__caption">
						Back-end
					</p>
				</div>
				<div>
					<p className="about-project__button about-project__button-front">
						4 неделя
					</p>
					<p className="about-project__caption">
						Front-end
					</p>
				</div>
			</div>
		</section>
	);
};
export default AboutProject;
