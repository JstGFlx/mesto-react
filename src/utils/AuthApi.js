class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._headers = headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  register(data) {
    return fetch(`${this._baseUrl}signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }

  login(data) {
    return fetch(`${this._baseUrl}signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }
}

export default AuthApi;
