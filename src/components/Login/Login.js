// импорт стилей
// import "./Login.css";
// 
import AuthorForm from "../AuthorForm/AuthorForm";

import React from "react";
const Login = () => {
	return (
		<AuthorForm
			className="author-form"
			title="Рады видеть!"
			formName="login"
			text="Ещё не зарегистрированы?"
			textLink="Регистрация"
			textButton="Войти"
			link="/signup"
		>
			<label className="author-form__label">
				<span className="author-form__span">
					E-mail
				</span>
				<input className="author-form__input" type="email" name="login-email" />
				<span className="author-form__error-text">
					{/* Ошибка */}
				</span>
			</label>
			<label className="author-form__label">
				<span className="author-form__span">
					Пароль
				</span>
				<input className="author-form__input" type="password" name="login-password" />
				<span className="author-form__error-text">
					{/* Ошибка */}
				</span>
			</label>
		</AuthorForm>
	);
};
export default Login;
