// импорт стилей
import "./Menu.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import Exite from "../../images/Group1.svg";
// import Exite from "../../images/Delete.png";

const Menu = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const handleMenuClick = () => {
		setMenuOpen(!isMenuOpen);
	}
	return (
		<>
		{/* <div className='menu__header'></div> */}
			<div className={`${isMenuOpen ? "menu__off" : "menu__header"}`} onClick={handleMenuClick}>
			</div >
			<div className={`${isMenuOpen ? "menu__on" : "menu__off"}`}>
				<div className="menu__box">
				<button className="menu__button" onClick={handleMenuClick} type="button">
					<img src={Exite} alt="Выход" className='menu__image' />
				</button>
				<div className="menu__container">
					<Link className="menu__link">
					Главная
					</Link>
					<Link className="menu__link menu__link-movies">
					Фильмы
					</Link>
					<Link className="menu__link">
					Сохранённые фильмы
					</Link>
				</div>
				<Link className="menu__link-button">
					Аккаунт
				</Link>
				</div>
			</div>
		</>
	);
};
export default Menu;
