// импорт стилей
import "./Header.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
// 
import Logo from "../../images/logo1.svg";
import Navigation from "../Navigation/Navigation";
import Menu from "../Menu/Menu";
const Header = (props) => {
	const { isLoggin = true } = props;
	// const isLoggin = false;
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
						<Link className="header__sign-up" to="/signup">
							Регистрация
						</Link>
						<Link className="header__sign-in" to="/signin">
							Войти
						</Link>
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
