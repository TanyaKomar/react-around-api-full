import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function resetForm() {
    setName("");
    setLink("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
    resetForm();
  }

  return (
    <PopupWithForm
      name="place"
      title="New place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonTitle={"Create"}
      buttonAreaLabel={"Create new card"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="title-input"
        type="text"
        name="title"
        placeholder="Title"
        minLength="2"
        maxLength="30"
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__error title-input-error"></span>
      <input
        className="popup__input"
        id="link-input"
        type="url"
        name="link"
        placeholder="Image link"
        required
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
