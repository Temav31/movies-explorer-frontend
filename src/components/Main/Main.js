import React from "react";
// импорт стилей
import "./Main.css";
// импорт блоков
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
// импорт базовых
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const Main = (props) => {
	return (
		<>
		<Header />
		{/* Основной бллок */}
		<main>
			<Promo />
			<AboutProject />
			<Techs />
			<AboutMe />
		</main>
		{/* Конец основного блока */}
		<Footer />
		</>
	);
};
export default Main;
