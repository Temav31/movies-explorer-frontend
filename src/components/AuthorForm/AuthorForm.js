// импорт стилей
import "./AuthorForm.css";
import { Link } from "react-router-dom";
// 
// import AuthorForm from "../AuthorForm/AuthorForm"
import Logo from "../../images/logo.png";

import React from "react";
const AuthorForm = (props) => {
	const {title, formName, text, textLink, textButton, link, children} = props;
	return (
		<section className="author-form">
			<Link to="/" className="author-form__link">
				<img className="author-form__image" src={Logo} alt="Лого" />
			</Link>
			<h1 className="author-form__header">
				{title}
			</h1>
			<form className="author-form__form" name={`form-${formName}`}>
				{children}
			</form>
			<button className="author-form__button" type="submit">
				{textButton}
			</button>
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
