
// импорт стилей
import "./Promo.css";
// импорт навигации
import NavTab from "../NavTab/NavTab"
import React from "react";
const Promo = () => {
	return (
		<section className='promo'>
			<div  className="promo__container">
			<h2 id="promo" className="promo__header">
				Учебный проект студента факультета Веб-разработки.
			</h2>
			</div>
			<NavTab />
		</section>
	);
};
export default Promo;
