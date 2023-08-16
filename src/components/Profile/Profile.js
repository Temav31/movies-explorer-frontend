// импорт стилей
import "./Profile.css";

import React from "react";
import { Link } from "react-router-dom";
// импорт базовых
import Header from "../Header/Header";

const Profile = () => {
	return (
		<>
			<Header
				isLoggin= {false}
			/>
			{/* Основной бллок */}
			<main>
				<section className="profile">
					<h1 className="profile__header">
						Привет, Виталий!
					</h1>
					<ul className="profile__container">
						<li className="profile__item">
							<p className="profile__text-info">
								Имя
							</p>
							<p className="profile__text">
								Виталий
							</p>
						</li>
						<li className="profile__item">
							<p className="profile__text-info">
								E-mail
							</p>
							<p className="profile__text">
								pochta@yandex.ru
							</p>
						</li>
					</ul>
					<Link className="profile__link" to="/signin">
						Редактировать
					</Link>
					<Link className="profile__link-exite" to="/">
						Выйти из аккаунта
					</Link>
				</section>
			</main>
		</>
	);
};
export default Profile;
