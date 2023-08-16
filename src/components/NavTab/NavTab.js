// импорт стилей
import "./NavTab.css";
// импорт изображения
// 
import React from "react";
const NavTab = () => {
	return (
		<div className="navtab">
			<div className="navtab__container">
				<a className="navtab__link" href="#about-project">
					О проекте
				</a>
				<a className="navtab__link" href="#techs">
					Технологии
				</a>
				<a className="navtab__link" href="#about-me">
					Студент
				</a>
			</div>
		</div>
	);
};
export default NavTab;
