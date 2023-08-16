// импорт стилей
import "./Footer.css";
import React from "react";

const Footer = () => {
	return (
		<section className="footer">
			<h2 className="footer__head">
				Учебный проект Яндекс.Практикум х BeatFilm.
			</h2>
			<div className="footer__box">
				<ul className="footer__container">
					<li>
						<a className="footer__link" href='https://practicum.yandex.ru' target="_blank" rel="noopener noreferrer">
							Яндекс.Практикум
						</a>
					</li>
					<li>
						<a className="footer__link" href='https://github.com/Temav31?tab=repositories' target="_blank" rel="noopener noreferrer">
							Github
						</a>
					</li>
				</ul>
				<p className="footer__text">
					©2023
				</p>
			</div>
		</section>
	);
};
export default Footer;
