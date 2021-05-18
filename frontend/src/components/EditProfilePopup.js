import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Edit profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonTitle={"Save"}
      buttonAreaLabel={"Save profile info"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="name-input"
        type="text"
        name="name"
        placeholder="Name"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__error name-input-error"></span>
      <input
        className="popup__input"
        id="about-input"
        type="text"
        name="about"
        placeholder="About me"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
