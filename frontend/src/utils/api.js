const BASE_URL = "https://api.tanyakomar.students.nomoreparties.site";
// const BASE_URL = "http://localhost:3000";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getCardList(token = localStorage.getItem("token")) {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  getUserInfo(token = localStorage.getItem("token")) {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  getInitialData(token = localStorage.getItem("token")) {
    return Promise.all([this.getCardList(token), this.getUserInfo(token)]);
  }

  addCard({ name, link }, token = localStorage.getItem("token")) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  removeCard(cardID, token = localStorage.getItem("token")) {
    return fetch(this._baseUrl + `/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  addLike(cardID, token = localStorage.getItem("token")) {
    return fetch(this._baseUrl + `/cards/${cardID}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  removeLike(cardID, token = localStorage.getItem("token")) {
    return fetch(this._baseUrl + `/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  changeLikeCardStatus(cardID, isLiked) {
    return isLiked ? this.addLike(cardID) : this.removeLike(cardID);
  }

  setUserInfo({ name, about }, token = localStorage.getItem("token")) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: name, about: about }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  setUserAvatar({ avatar }, token = localStorage.getItem("token")) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: avatar }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }
}

const api = new Api({
  baseUrl: BASE_URL,
});

export default api;
