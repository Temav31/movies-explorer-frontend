// импорт стилей
// import "./Register.css";
import AuthorForm from "../AuthorForm/AuthorForm";
// валидация 
import ValidationForm from "../../hooks/validationForm";

import React from "react";
const Register = ({ isRegister }) => {
	// const { formValid, handleChangeLogin, clearForm, dataUser, errorsText } = ValidationForm({ name: '', password: '', email: '' });
	// function handleSubmit(event) {
	// 	console.log(dataUser);
	// 	event.preventDefault();
	// 	isRegister({
	// 		name: dataUser.name,
	// 		email: dataUser.email,
	// 		password: dataUser.password,
	// 	});
	// 	clearForm();
	// }
	const [dataUser, setDataUser] = React.useState({ email: '', password: '' });
	const [formValid, setFormValid] = React.useState(false);
	const [errorsText, setErrorsText] = React.useState({});
    function handleSubmit(event) {
        event.preventDefault();
        isRegister(dataUser);
    }
    function handleChange(event) {
		const { name, value } = event.target;
		setDataUser({ ...dataUser, [name]: value });
		setErrorsText({ ...errorsText, [name]: event.target.validationMessage });
		const target = event.target;
		const data = target.closest("form").checkValidity();
		setFormValid(data);
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
						onChange={handleChange}
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
						onChange={handleChange}
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
						onChange={handleChange}
					/>
					<span className="author-form__error-text">
						{errorsText[`password`]}
					</span>
				</label>
		</AuthorForm>
	);
};
export default Register;
