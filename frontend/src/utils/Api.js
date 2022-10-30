class Api {
  constructor(options) {
    this._options = options;
    this._url = options.baseUrl;// old one: https://mesto.nomoreparties.co/v1/cohort-45
    this._headers = options.headers;
    this._token = options.headers.authorization;
  }

  _getResponseData (res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: {
        authorization: `${this._token}`
      }
    })
    .then(this._getResponseData);
  }

  addNewCards ({name, link}) {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._getResponseData)
  }

  updateProfileInfo ({name, description}) { 
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
    .then(this._getResponseData)
  }
 
  updateAvatar ({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    })
    .then(this._getResponseData)
  }

  takeUserInfo () {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: {
        authorization: `${this._token}`
      } 
    })
    .then(this._getResponseData)
  }

  likePhoto (id, method) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      credentials: 'include',
      method: `${method}`,
      headers: {
        authorization: `${this._token}`      
      }
    })
    .then(this._getResponseData)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`      
      }
    })
    .then(this._getResponseData)
  }
}

const jwt = localStorage.getItem('jwt');

export const api = new Api({
  baseUrl: 'https://api.irinashumak.students.nomoredomains.icu',
  headers: {
    authorization: `${jwt}`,
    'Content-Type': 'application/json'
  }
});