import React from "react";

function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? `popup popup_type_${props.name} popup_open` : `popup popup_type_${props.name}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" aria-label="Close popup" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={`${props.name}Form`} onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button className="popup__button" type="submit" aria-label={props.buttonAreaLabel}>
            {props.buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
