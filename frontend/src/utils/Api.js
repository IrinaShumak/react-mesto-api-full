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

  _getToken = () => localStorage.getItem('jwt');

  getInitialCards() {
    return fetch(`${this._url}/cards`, {      
      headers: {
        authorization: `Bearer ${this._getToken()}`
      }
    })
    .then(this._getResponseData);
  }

  addNewCards ({name, link}) {
    return fetch(`${this._url}/cards`, {      
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Bearer ${this._getToken()}`
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._getResponseData)
  }

  updateProfileInfo ({name, description}) { 
    return fetch(`${this._url}/users/me`, {      
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${this._getToken()}`
      },
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
    .then(this._getResponseData)
  }
 
  updateAvatar ({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {      
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${this._getToken()}`
      },
      body: JSON.stringify({avatar})
    })
    .then(this._getResponseData)
  }

  takeUserInfo () {
    return fetch(`${this._url}/users/me`, {      
      headers: {
        authorization: `Bearer ${this._getToken()}`
      } 
    })
    .then(this._getResponseData)
  }

  likePhoto (id, method) {
    return fetch(`${this._url}/cards/${id}/likes`, {      
      method: `${method}`,
      headers: {
        authorization: `Bearer ${this._getToken()}`      
      }
    })
    .then(this._getResponseData)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {      
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${this._getToken()}`       
      }
    })
    .then(this._getResponseData)
  }
}


export const api = new Api({
  baseUrl: 'https://api.irinashumak.students.nomoredomains.icu',
  headers: {    
    'Content-Type': 'application/json'
  }
});