import { MAIN_URL } from "../utils/constant"

class AuthorApi {
	constructor(url) {
		this._url = url;
	}
	// проверка ошибок
	_checkResult(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	};
	// шапка
	_getHeaders() {
		return {
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	}
	// вход
	login(body) {
		return fetch(`${this._url}/signin`, {
			method: "POST",
			credentials: 'include',
			headers: this._getHeaders(),
			body: JSON.stringify(body)
		})
			.then((res) => this._checkResult(res));
	};
	// регистрация
	registration(body) {
		console.log(body);
		return fetch(`${this._url}/signup`, {
			method: "POST",
			credentials: 'include',
			headers: this._getHeaders(),
			body: JSON.stringify(body)
		})
			.then((res) => this._checkResult(res));
	};
	// проверка пользователя
	check(token) {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
			.then((res) => this._checkResult(res));
	}
	exit() {
		return fetch(`${this._url}/signout`, {
			method: "POST",
			credentials: 'include',
			headers: this._getHeaders()
		})
			.then((res) => this._checkResult(res));
	}
}
// класс апи 
const auth = new AuthorApi(MAIN_URL);
// const auth = new AuthorApi('http://localhost:3000');
export default auth;
