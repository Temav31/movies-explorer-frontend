// импорт стилей
// import "./Register.css";
// 
import AuthorForm from "../AuthorForm/AuthorForm";

import React from "react";
const Register = () => {
	return (
		<AuthorForm
			className="author-form"
			title="Добро пожаловать!"
			formName="register"
			text="Уже зарегистрированы?"
			textLink="Войти"
			textButton="Зарегистрироваться"
			link="/signin"
		>
			<label className="author-form__label">
				<span className="author-form__span">
					Имя
				</span>
				<input className="author-form__input" type="text" name="register-name" />
				<span className="author-form__error-text">
				</span>
			</label>
			<label className="author-form__label">
				<span className="author-form__span">
					E-mail
				</span>
				<input className="author-form__input" type="password" name="register-email" />
				<span className="author-form__error-text">
				</span>
			</label>
			<label className="author-form__label">
				<span className="author-form__span">
					Пароль
				</span>
				<input className="author-form__input" type="password" name="register-password" />
				<span className="author-form__error-text">
					Что-то пошло не так...
				</span>
			</label>
		</AuthorForm>
	);
};
export default Register;
