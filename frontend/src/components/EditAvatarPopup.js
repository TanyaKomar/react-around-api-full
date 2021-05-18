import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonTitle={"Save"}
      buttonAreaLabel={"Save avatar"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="avatar-input"
        type="url"
        name="link"
        placeholder="Image link"
        required
        ref={avatarRef}
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
