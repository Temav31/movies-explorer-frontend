// импорт стилей
import "./AuthorForm.css";
import { Link } from "react-router-dom";
// 
// import AuthorForm from "../AuthorForm/AuthorForm"
import Logo from "../../images/logo1.svg";
// import Logo from "../../images/logo.png";

import React from "react";
const AuthorForm = (props) => {
	const { title, formName, text, textLink, textButton, link, children, isValid, onSubmit } = props;
	return (
		<section className="author-form">
			<Link to="/" className="author-form__link-logo">
				<img className="author-form__image" src={Logo} alt="Лого" />
			</Link>
			<h1 className="author-form__header">
				{title}
			</h1>
			<form className="author-form__form" name={`form-${formName}`} onSubmit={onSubmit}>
				{children}
				<button className={`author-form__button ${!isValid ? "author-form__button_closed" : ""}`} type="submit">
					{textButton}
				</button>
			</form>
			<div className="author-form__container">
				<p className="author-form__text">
					{text}
				</p >
				<Link to={link} className="author-form__link">
					{textLink}
				</Link>
			</div>
		</section>
	);
};
export default AuthorForm;
