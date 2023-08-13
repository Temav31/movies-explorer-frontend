// импорт стилей
import "./Header.css";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
// 
import Logo from "../../images/logo.png";
import Navigation from "../Navigation/Navigation";
import Menu from "../Menu/Menu";
const Header = (props) => {
	// const { isLoggin = true } = props;
	const isLoggin = true;
	// место
	const location = useLocation();
	return (
		<header className={`header ${location.pathname === "/" ? "header__not-login" : ""}`}>
			<Link className="header__link" to="/">
				<img className="header__image" src={Logo} alt="Лого" />
			</Link>
			{!isLoggin ? (
				<>
					<div className="header__container">
						<NavLink className="header__sign-up" to="/singup">
							Регистрация
						</NavLink>
						<NavLink className="header__sign-in" to="/singin">
							Войти
						</NavLink>
					</div>
				</>
			) : (
				<>
					<Navigation />
					<Menu />
				</>
			)}
		</header>
	);
};
export default Header;
