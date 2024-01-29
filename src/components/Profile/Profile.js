// импорт стилей
import "./Profile.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// импорт базовых
import Header from "../Header/Header";
// контекст
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// валидация 
// валимдация 
import {
	standartName,
	standartEmail,
	messageName,
	messageEmail
} from "../../utils/constant";

const Profile = ({ isExite, isLogin, onUpdateUser, block }) => {
	// профиль
	const currentUser = React.useContext(CurrentUserContext);
	// данные
	const [name, setName] = useState(currentUser.name);
	const [email, setEmail] = useState(currentUser.email);
	// данные
	// const [nameUser, setNameUser] = useState(currentUser.name);
	// const [emailUser, setEmailUser] = useState(currentUser.email);
	// ошибки
	const [errName, setErrName] = useState("");
	const [errEmail, setErrEmail] = useState("");
	// валидация
	const [nameValidation, setNameValidation] = useState(false);
	const [emailValidation, setEmailValidation] = useState(false);
	// правильность формы
	const [formValue, setFormValue] = useState(false);
	// изменения имени
	function handleChangeName(event) {
		setErrName("");
		const target = event.target;
		const nameValue = target.value;
		setName(nameValue);
		setNameValidation(true);
		if (target.validity.valid) {
			if (!standartName.test(nameValue)) {
				setNameValidation(false);
				setErrName(messageName);
			}
		} else {
			setErrName(target.validationMessage);
			setNameValidation(false);
		}
		console.log(nameValidation);
	};
	// изменения почты
	function handleChangeEmail(event) {
		setErrEmail("");
		const target = event.target;
		const emailValue = target.value;
		setEmail(emailValue);
		setEmailValidation(true);
		if (target.validity.valid) {
			if (!standartEmail.test(emailValue)) {
				setEmailValidation(false);
				setErrEmail(messageEmail);
			}
		} else {
			setErrEmail(target.validationMessage);
			setEmailValidation(false);
		}
		console.log(emailValidation);
	};
	// отправка формы 
	function handleSubmit(event) {
		event.preventDefault();
		onUpdateUser({
			name: name,
			email: email,
		});
		// setEmailUser(email);
		// setNameUser(name);
		setFormValue(false);
	}
	useEffect(() => {
		// const validName = nameUser === name;
		// const validEmail = emailUser === email;
		const validName = currentUser.name === name;
		const validEmail = currentUser.email === email;
		const valid = validEmail && validName;
		const validInput = nameValidation && emailValidation;
		// console.log(valid);
		// console.log(validInput);
		if (!valid || validInput) {
			setFormValue(true);
		} else {
			setFormValue(false);
		}
		// console.log(formValue);
	}, [name, email, nameValidation, emailValidation]);
	return (
		<>
			<Header
				isLogin={isLogin}
			/>
			{/* Основной бллок */}
			<main>
				<section className="profile">
					<h1 className="profile__header">
						{`Привет, ${currentUser.name}!`}
					</h1>
					<form
						className="profile__container"
						name="account"
						onSubmit={handleSubmit}
					>
						<div className="profile__item">
							<p className="profile__text-info">
								Имя
							</p>
							<input
								className="profile__input"
								name="name"
								type="name"
								minLength="3"
								maxLength="64"
								onChange={handleChangeName}
								value={name}
								id='profile-name'
								required
								disabled={block}
							/>
						</div>
						<span className="profile__success">
							{errName}
						</span>
						<div className="profile__item">
							<p className="profile__text-info">
								E-mail
							</p>
							<input
								className="profile__input"
								name="email"
								type="email"
								minLength="3"
								maxLength="64"
								required
								id='profile-email'
								value={email}
								onChange={handleChangeEmail}
								disabled={block}
							/>
						</div>
						<span className="profile__success">
							{errEmail}
						</span>
						<button className={`profile__link  
						${!formValue ? "profile__link_disabled" : ""}
						${block ? "profile__link_disabled" : ""}
						`}
							type="submit"
							disabled={!formValue}
						>
							Редактировать
						</button>
					</form>
					<Link className="profile__link-exite" to="/" onClick={isExite}>
						Выйти из аккаунта
					</Link>
				</section>
			</main>
		</>
	);
};
export default Profile;
