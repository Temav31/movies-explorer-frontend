import { MAIN_URL } from "./constant"

class MainApi {
	constructor(basePath) {
		this._basePath = basePath;
		// this._token = token;
	}
	_getHeaders() {
		return {
			// authorization: this._token,
			authorization: `Bearer ${this._token}`,
			'Content-Type': 'application/json'
		}
	}
	_getJson(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	// получить данные
	getProfile() {
		const token = localStorage.getItem("token");
		const p = fetch(`${this._basePath}/users/me`, {
			credentials: 'include',
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
		})
		return p.then(this._getJson);
	};
	// обновить данные
	setUserInfo({ name, email }) {
		const token = localStorage.getItem("token");
		return fetch(`${this._basePath}/users/me`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ name, email }),
		})
			.then(this._getJson);
	}
	// добавление карточки
	addMovie(data) {
		const token = localStorage.getItem("token");
		return fetch(`${this._basePath}/movies`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				country: data.country,
				director: data.director,
				duration: data.duration,
				year: data.year,
				description: data.description,
				image: `https://api.nomoreparties.co/${data.image.url}`,
				trailerLink: data.trailerLink,
				thumbnail: `https://api.nomoreparties.co/${data.image.url}`,
				nameRU: data.nameRU,
				nameEN: data.nameEN,
				movieId: data.id,
			}),
		})
			.then(this._getJson);
	}
	// удаление карточки
	removeMovie(id) {
		// console.log(id);
		const token = localStorage.getItem("token");
		return fetch(`${this._basePath}/movies/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
		})
			.then(this._getJson);
	}
	// получить фильмы
	getMoviesList() {
		const token = localStorage.getItem("token");
		const c = fetch(`${this._basePath}/movies`, {
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
		})
		return c.then(this._getJson);
	};
}
// класс апи 
const main = new MainApi(MAIN_URL);
export default main;
