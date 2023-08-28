export const MOVIES_URL = "https://api.nomoreparties.co/";

// export const MAIN_URL = "http://api.work.tema.nomoredomains.work";
// const auth = new AuthorApi('http://localhost:3000');
export const MAIN_URL = "http://localhost:3000";
// патерны
export const patternUrl = new RegExp(/^(https?:\/\/)+[^\s]*/);

export const LENGHT_MOVIE = 40;
// узнать длину фильма
const getLenghtMovie = (duration, movie) => {
	if (duration < 60) {
		return `${movie.duration} минут`;
	} else if (duration === 60) {
		return `1 час`;
	} else if (duration < 120) {
		return `1 час ${movie.duration - 60} минут`
	} else if (duration === 120) {
		return `2 часа`
	}else if (duration < 180) {
		return `2 часа ${movie.duration - 120} минут`
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
	serverUrl
};
