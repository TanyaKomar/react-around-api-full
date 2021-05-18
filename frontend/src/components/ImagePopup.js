import React from "react";

function ImagePopup(props) {
  return (
    <div className={props.card?.name ? "popup popup_type_card popup_open" : "popup popup_type_card"}>
      <div className="popup__content_content_card">
        <button className="popup__close" type="button" aria-label="Close popup" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
        <h3 className="popup__card-title">{props.card?.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
