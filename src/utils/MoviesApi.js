import { MOVIES_URL } from "./constant"
class MoviesApi {
	_checkResult(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	};
	getMovies() {
		return fetch("https://api.nomoreparties.co/beatfilm-movies", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(this._checkResult);
	};
}

// класс апи 
const movies = new MoviesApi(MOVIES_URL);
export default movies;
