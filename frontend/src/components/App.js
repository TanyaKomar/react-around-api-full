import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { Header, headerTypes } from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import InfoTolltip from "./InfoTooltip";
import * as auth from "../utils/auth";

import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = React.useState("");
  const [iconClass, setIconClass] = React.useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const [token, setToken] = React.useState(localStorage.getItem("token"));
  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }
  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.error(error));
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.error(error));
  }

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  React.useEffect(() => {
    api
      .getCardList()
      .then((cards) => {
        setCards(cards.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleAddPlace({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(error));
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push("/around");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    auth
      .register(email, password)
      .then((res) => {
        if (res.data) {
          setTitle("Success! You have now been registered.");
          setIconClass("popup__icon");
          setIsSuccess(true);
        } else {
          setTitle("Oops, something went wrong! Please try again.");
          setIconClass("popup__icon_error");
          setIsSuccess(false);
        }
        setIsInfoTooltipOpen(true);
        resetForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(email, password)
      .then((data) => {
        resetForm();
        setLoggedIn(true);
        return data;
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          // setToken(data.token);
          history.push("/around");
        } else {
          setTitle("Oops, something went wrong! Please try again.");
          setIconClass("popup__icon_error");
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((error) => {
        setLoggedIn(false);
        console.error(error);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/signup">
            <Header type={headerTypes.signup} />
            <Register
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleRegisterSubmit={handleRegisterSubmit}
            />
          </Route>
          <Route path="/signin">
            <Header type={headerTypes.signin} />
            <Login
              tokenCheck={tokenCheck}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLoginSubmit={handleLoginSubmit}
            />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/around" /> : <Redirect to="/signin" />}
          </Route>
          <ProtectedRoute
            path="/around"
            loggedIn={loggedIn}
            userEmail={userEmail}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
        </Switch>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

        <PopupWithForm name="delete" title="Are you sure?" isOpen={false} onClose={closeAllPopups}>
          <button className="popup__button" type="submit" aria-label="Delete card">
            Yes
          </button>
        </PopupWithForm>

        <InfoTolltip
          isOpen={isInfoTooltipOpen}
          onClose={() => {
            setIsInfoTooltipOpen(false);
            if (isSuccess) {
              history.push("/signin");
            }
          }}
          title={title}
          iconClass={iconClass}
        />

        <ImagePopup name="image" card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
