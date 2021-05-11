class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
    }).then(this.getResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { credentials: 'include' }).then(
      this.getResponse
    );
  }

  changeLikeCardStatus(cardID, like) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this.getResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(this.getResponse);
  }

  pathUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(this.getResponse);
  }

  patchAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(link),
    }).then(this.getResponse);
  }
  postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(this.getResponse);
  }

  register(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }

  login(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include',
    }).then(this._getResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}/users/signout`, {
      credentials: 'include',
    }).then(this._getResponse);
  }

  getContent() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then(this._getResponse);
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
}

export default Api;
