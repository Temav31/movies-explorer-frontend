// импорт стилей
import "./Techs.css";

import React from "react";
const Techs = () => {
	return (
		<section className="techs">
			<h2 id="techs" className="techs__head">
				Технологии
			</h2>
			<h3 className="techs__title">
			7 технологий
			</h3>
			<p className="techs__text">
			На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
			</p>
			<ul className="techs__container">
                    <li className="techs__element">
						<p className="techs__text-element">HTML</p>
						</li>
                    <li className="techs__element">
						<p className="techs__text-element">CSS</p>
					</li>
                    <li className="techs__element">
						<p className="techs__text-element">JS</p>
					</li>
                    <li className="techs__element">
						<p className="techs__text-element">React</p>
					</li>
                    <li className="techs__element">
						<p className="techs__text-element">Git</p>
					</li>
                    <li className="techs__element">
						<p className="techs__text-element">Express.js</p>
					</li>
                    <li className="techs__element">
						<p className="techs__text-element">mongoDB</p>
					</li>
                </ul>
		</section>
	);
};
export default Techs;
