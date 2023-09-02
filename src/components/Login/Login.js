// импорт стилей
// import "./Login.css";
import AuthorForm from "../AuthorForm/AuthorForm";
// валидация 
// import ValidationForm from "../../hooks/useValidationForm";

import React, { useEffect, useState } from "react";
// валимдация 
import {
	standartEmail,
	messageEmail
} from "../../utils/constant";

const Login = ({ isLogin, block }) => {
	// данные
	const [passw, setPassw] = useState("");
	const [email, setEmail] = useState("");
	// ошибки
	const [errPassw, setErrPassw] = useState("");
	const [errEmail, setErrEmail] = useState("");
	// валидация
	const [passwValidation, setPasswValidation] = useState(false);
	const [emailValidation, setEmailValidation] = useState(false);
	// правильность формы
	const [formValue, setFormValue] = useState(false);
	// изменение пароля
	function handleChangePassword(event) {
		setErrPassw("");
		const target = event.target;
		const passwValue = target.value;
		setPassw(passwValue);
		if (target.validity.valid) {
			setErrPassw(target.validationMessage);
			setPasswValidation(true);
		}
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
	};
	// отправка формы 
	function handleSubmit(event) {
		event.preventDefault();
		isLogin({
			email: email,
			password: passw,
		});
	}
	useEffect(() => {
		if ( email && passw &&
			emailValidation && passwValidation) {
				setFormValue(true);
		} else { 
			setFormValue(false);
		}
		// console.log(formValue);
	}, [email, passw, emailValidation, passwValidation]);
	return (
		<AuthorForm
			className="author-form"
			title="Рады видеть!"
			formName="login"
			text="Ещё не зарегистрированы?"
			textLink="Регистрация"
			textButton="Войти"
			link="/signup"
			isValid={formValue}
			onSubmit={handleSubmit}
			block={block}
		>
			<label className="author-form__label">
				<span className="author-form__span">
					E-mail
				</span>
				<input
					className="author-form__input"
					type="email"
					name="email"
					required
					id='login-email'
					value={email}
					onChange={handleChangeEmail}
					disabled={block}
				/>
				<span className="author-form__error-text">
					{errEmail}
				</span>
			</label>
			<label className="author-form__label">
				<span className="author-form__span">
					Пароль
				</span>
				<input
					className="author-form__input"
					type="password"
					id='login-password'
					name="password"
					required
					value={passw}
					onChange={handleChangePassword}
					disabled={block}
				/>
				<span className="author-form__error-text">
					{errPassw}
				</span>
			</label>
		</AuthorForm>
	);
};
export default Login;
