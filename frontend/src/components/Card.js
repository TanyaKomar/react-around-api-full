import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser?._id === props.card.owner._id;
  const cardDeleteButtonClassName = `card__btn-delete ${
    !isOwn && "card__btn-delete_hidden"
  }`;
  const isLiked = props.card.likes.some((i) => currentUser?._id === i._id);
  const cardLikeButtonClassName = `card__btn-like ${
    isLiked && "card__btn-like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="card">
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__place">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Like"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Delete"
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}

export default Card;
