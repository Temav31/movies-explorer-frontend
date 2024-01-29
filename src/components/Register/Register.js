import React, { useEffect, useState } from "react";
import AuthorForm from "../AuthorForm/AuthorForm";
// валидация 
// import ValidationForm from "../../hooks/useValidationForm";
// валимдация 
import {
	standartName,
	standartEmail,
	messageName,
	messageEmail
} from "../../utils/constant";

const Register = ({ isRegister, block }) => {
	// данные
	const [name, setName] = useState("");
	const [passw, setPassw] = useState("");
	const [email, setEmail] = useState("");
	// ошибки
	const [errName, setErrName] = useState("");
	const [errPassw, setErrPassw] = useState("");
	const [errEmail, setErrEmail] = useState("");
	// валидация
	const [nameValidation, setNameValidation] = useState(false);
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
		// console.log(passwValidation);
	};
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
		// console.log(nameValidation);
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
		// console.log(emailValidation);
	};
	// отправка формы 
	function handleSubmit(event) {
		event.preventDefault();
		isRegister({
			name: name,
			email: email,
			password: passw,
		});
	}
	useEffect(() => {
		if ( name && email && passw &&
			nameValidation && emailValidation && passwValidation) {
				setFormValue(true);
		} else { 
			setFormValue(false);
		}
		console.log(formValue);
	}, [name, email, passw, nameValidation, emailValidation, passwValidation]);

	return (
		<AuthorForm
			className="author-form"
			title="Добро пожаловать!"
			formName="register"
			text="Уже зарегистрированы?"
			textLink="Войти"
			textButton="Зарегистрироваться"
			link="/signin"
			isValid={formValue}
			onSubmit={handleSubmit}
			block={block}
		>
			<label className="author-form__label">
				<span className="author-form__span">
					Имя
				</span>
				<input
					className="author-form__input"
					type="text"
					name="name"
					required
					minLength={2}
					id='register-name'
					value={name}
					onChange={handleChangeName}
					disabled={block}
				/>
				<span className="author-form__error-text">
					{errName}
				</span>
			</label>
			<label className="author-form__label">
				<span className="author-form__span">
					E-mail
				</span>
				<input
					className="author-form__input"
					type="email"
					name="email"
					required
					id='register-email'
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
					name="password"
					required
					id='register-password'
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
export default Register;
