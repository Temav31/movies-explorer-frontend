// импорт стилей
import "./Profile.css";

import React from "react";
import { Link } from "react-router-dom";
// импорт базовых
import Header from "../Header/Header";
// контекст
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// валидация 
import ValidationForm from "../../hooks/validationForm";

const Profile = ({ isExite, isLogin, onUpdateUser }) => {
	const { formValid, handleChangeLogin, clearForm, dataUser, errorsText } = ValidationForm({ name: '', email: '' });
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [text, setText] = React.useState('');
	const currentUser = React.useContext(CurrentUserContext);

	// его данные будут использованы в управляемых компонентах.
	React.useEffect(() => {
		setName(currentUser.name);
		setEmail(currentUser.email);
	}, [currentUser]);


	function handleSubmit(event) {
		event.preventDefault();
		console.log(name, email);
		onUpdateUser({
			name: name,
			email: email,
		});
		clearForm();
		setText("Профиль Обновлён");
	}
	function handleChangeEmail(event) {
		setEmail(event.target.value);
		setText(" ");
	};
	function handleChangeName(event) {
		setName(event.target.value);
		setText(" ");
	};
	return (
		<>
			<Header
				isLogin={isLogin}
			/>
			{/* Основной бллок */}
			<main>
				<section className="profile">
					<h1 className="profile__header">
						{`Привет, ${currentUser.name}!`}
					</h1>
					<form
						className="profile__container"
						name="account"
						onSubmit={handleSubmit}
					>
							<div className="profile__item">
								<p className="profile__text-info">
									Имя
								</p>
								<input
									className="profile__input"
									name="name"
									type="name"
									minLength="3"
									maxLength="64"
									onChange={handleChangeName}
									value={name}

									required=""
								/>
							</div>
							<div className="profile__item">
								<p className="profile__text-info">
									E-mail
								</p>
								<input
									className="profile__input"
									name="email"
									type="email"
									minLength="3"
									maxLength="64"
									onChange={handleChangeEmail}
									value={email}

									required=""
								/>
							</div>
							<span className="">
								{text ?? ""}
							</span>
						<button className="profile__link" type="submit">
							Редактировать
						</button>
					</form>
					<Link className="profile__link-exite" to="/" onClick={isExite}>
						Выйти из аккаунта
					</Link>
				</section>
			</main>
		</>
	);
};
export default Profile;
