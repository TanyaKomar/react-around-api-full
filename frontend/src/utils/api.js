class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getCardList(token) {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  getUserInfo(token) {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  getInitialData() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  addCard({ name, link }, token) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  removeCard(cardID, token) {
    return fetch(this._baseUrl + `/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  addLike(cardID, token) {
    return fetch(this._baseUrl + `/cards/likes/${cardID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  removeLike(cardID, token) {
    return fetch(this._baseUrl + `/cards/likes/${cardID}`, {
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

  setUserInfo({ name, about }, token) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: name, about: about }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`);
    });
  }

  setUserAvatar({ avatar }, token) {
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
  baseUrl: "https://api.tanyakomar.students.nomoreparties.site",
});

export default api;
