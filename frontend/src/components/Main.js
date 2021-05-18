import React from "react";
import { Header, headerTypes } from "./Header";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ userEmail, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header type={headerTypes.logout} userEmail={userEmail} />

      <main className="content">
        <section className="profile">
          <div className="profile__avatar_overlay" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser?.avatar} alt="Profile avatar" />
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <button
                className="profile__btn-edit"
                type="button"
                aria-label="Edit profile"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__about">{currentUser?.about}</p>
          </div>
          <button className="profile__btn-add" type="button" aria-label="Add new card" onClick={onAddPlace}></button>
        </section>
        <section className="gallery">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
