export const BASE_URL = 'https://irinashumak.students.nomoredomains.icu/';

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

//регистрация

export const register = (password, email) => {  
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {      
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(getResponseData)
};

// авторизация

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {      
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(getResponseData)  
};

//проверка токена при повторном входе
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {      
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getResponseData)  
}