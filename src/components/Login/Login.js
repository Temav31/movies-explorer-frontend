// импорт стилей
// import "./Login.css";
import AuthorForm from "../AuthorForm/AuthorForm";
// валидация 
import ValidationForm from "../../hooks/validationForm";

import React from "react";
const Login = ({ isLogin }) => {
	const { formValid, handleChangeLogin, dataUser, errorsText } = ValidationForm();
	function handleSubmit(event) {
		event.preventDefault();
		isLogin({
			email: dataUser.email,
			password: dataUser.password,
		});
		// clearForm();
	}
	// const [dataUser, setDataUser] = React.useState({ email: '', password: '' });
	// const [formValid, setFormValid] = React.useState(false);
	// const [errorsText, setErrorsText] = React.useState({});
    // function handleSubmit(event) {
    //     event.preventDefault();
    //     isLogin(dataUser);
    // }
    // function handleChange(event) {
	// 	const { name, value } = event.target;
	// 	setDataUser({ ...dataUser, [name]: value });
	// 	setErrorsText({ ...errorsText, [name]: event.target.validationMessage });
	// 	const target = event.target;
	// 	const data = target.closest("form").checkValidity();
	// 	setFormValid(data);
    // }
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
