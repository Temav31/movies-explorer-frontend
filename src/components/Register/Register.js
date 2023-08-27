// импорт стилей
// import "./Register.css";
import AuthorForm from "../AuthorForm/AuthorForm";
// валидация 
import ValidationForm from "../../hooks/validationForm";

import React from "react";
const Register = ({ isRegister }) => {
	const { formValid, handleChangeLogin, clearForm, dataUser, errorsText } = ValidationForm({ name: '', password: '', email: '' });
	function handleSubmit(event) {
		console.log(dataUser);
		event.preventDefault();
		isRegister({
			name: dataUser.name,
			email: dataUser.email,
			password: dataUser.password,
		});
		clearForm();
	}
	return (
		<AuthorForm
			className="author-form"
			title="Добро пожаловать!"
			formName="register"
			text="Уже зарегистрированы?"
			textLink="Войти"
			textButton="Зарегистрироваться"
			link="/signin"
			isValid={formValid}
			onSubmit={handleSubmit}
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
						value={dataUser.name}
						onChange={handleChangeLogin}
					/>
					<span className="author-form__error-text">
						{errorsText[`name`]}
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
						value={dataUser.email}
						onChange={handleChangeLogin}
					/>
					<span className="author-form__error-text">
						{errorsText[`email`]}
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
						value={dataUser.password}
						onChange={handleChangeLogin}
					/>
					<span className="author-form__error-text">
						{errorsText[`password`]}
					</span>
				</label>
		</AuthorForm>
	);
};
export default Register;
