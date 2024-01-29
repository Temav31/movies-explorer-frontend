export const MOVIES_URL = "https://api.nomoreparties.co/";

export const MAIN_URL = "https://api.work.tema.nomoredomains.work";
// const auth = new AuthorApi('http://localhost:3000');
// export const MAIN_URL = "http://localhost:3000";
// патерны
export const patternUrl = new RegExp(/^(https?:\/\/)+[^\s]*/);

export const LENGHT_MOVIE = 40;
// узнать длину фильма
const getLenghtMovie = (duration, movie) => {
	if (duration < 60) {
		return `${movie.duration}м`;
	} else if (duration === 60) {
		return `1ч`;
	} else if (duration < 120) {
		return `1ч${movie.duration - 60}м`
	} else if (duration === 120) {
		return `2ч`
	}else if (duration < 180) {
		return `2ч${movie.duration - 120}м`
	}
}
// ограничения для изображения карточки
const MOVIES_LIMIT = 120;
// количество карточек под размер
const SMALL_SEARCH = 5;
const MEDIUM_SEARCH = 4;
const BIG_SEARCH = 4;
// размеры
const BIG_WIDTH = 1280;
const MEDIUM_WIDTH = 768;
const SMALL_WIDTH = 320;
// добавить картоки
const SMALL_ADD_MOVIES = 2;
const ADD_MOVIES = 4;
const serverUrl = "https://api.nomoreparties.co/";
// валидация и ошибки
const standartName = /^[a-zA-Z0-9-а-яА-Я\s]+$/;
const standartEmail =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const messageName = "В имене содержится недопустимый символ";
const messageEmail = "Адрес почты некорректен";
export {
	getLenghtMovie,
	MOVIES_LIMIT,
	SMALL_WIDTH,
	MEDIUM_WIDTH,
	BIG_WIDTH,
	SMALL_SEARCH,
	MEDIUM_SEARCH,
	BIG_SEARCH,
	SMALL_ADD_MOVIES,
	ADD_MOVIES,
	serverUrl,
	standartName,
	standartEmail,
	messageName,
	messageEmail
};
