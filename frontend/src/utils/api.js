class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getCardList() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  getInitialData() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  removeCard(cardID) {
    return fetch(this._baseUrl + `/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  addLike(cardID) {
    return fetch(this._baseUrl + `/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  removeLike(cardID) {
    return fetch(this._baseUrl + `/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }

  changeLikeCardStatus(cardID, isLiked) {
    return isLiked ? this.addLike(cardID) : this.removeLike(cardID);
  }

  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`);
    });
  }

  setUserAvatar({ avatar }) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)));
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-8",
  headers: {
    authorization: "31e91006-0f07-44fb-844b-4c49d9b3a932",
    "Content-Type": "application/json",
  },
});

export default api;
