// импорт стилей
// import "./Login.css";
import AuthorForm from "../AuthorForm/AuthorForm";
// валидация 
import ValidationForm from "../../hooks/validationForm";

import React from "react";
const Login = ({ isLogin }) => {
	const { formValid, handleChangeLogin, clearForm, dataUser, errorsText } = ValidationForm({password: '', email: ''});
	function handleSubmit(event) {
		event.preventDefault();
		isLogin({
			email: dataUser.email,
			password: dataUser.password,
		});
		clearForm();
	}
	return (
		<AuthorForm
			className="author-form"
			title="Рады видеть!"
			formName="login"
			text="Ещё не зарегистрированы?"
			textLink="Регистрация"
			textButton="Войти"
			link="/signup"
			isValid={formValid}
			onSubmit={handleSubmit}
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
export default Login;
