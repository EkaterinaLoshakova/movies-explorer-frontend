import {BEAT_FILMS_URL} from "./constants";

class MoviesApi {
  constructor() {
    this._url = BEAT_FILMS_URL + '/beatfilm-movies';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Error: ${res.status}`)
  }

  getBeatMovies() {
    return fetch(this._url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponse(res));
  }
}

export const moviesApi = new MoviesApi();
