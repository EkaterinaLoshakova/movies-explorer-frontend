import {MAIN_URL} from "./constants";

class MainApi {
  constructor() {
    this._url = MAIN_URL;
    this._headers = {
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json().then((data) => data.data || data)
    }
    return Promise.reject(res.status)
  }

  getUserData() {
    this._headers['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers
      }
    )
      .then(res => this._checkResponse(res));
  }

  register(name, email, password) {
    const data = {name, email, password};
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._checkResponse(res));
  }

  authorization(email, password) {
    const data = {email, password};
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._checkResponse(res));
  }

  setUserData(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then(res => this._checkResponse(res));
  }

  getMovies(){
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  postMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movie)
    })
      .then(res => this._checkResponse(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }
}

export const mainApi = new MainApi();
