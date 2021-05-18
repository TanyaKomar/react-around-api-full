import React from "react";

function InfoTooltip({ title, iconClass, onClose, isOpen }) {
  return (
    <div className={isOpen ? "popup popup_open" : "popup"}>
      <div className="popup__content_content_tooltip">
        <button className="popup__close" type="button" aria-label="Close popup" onClick={onClose}></button>
        <div className={iconClass}></div>
        <h3 className="popup__title">{title}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
