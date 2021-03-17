import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [valueName, setValueName] = useState("");
  const [valueAbout, setValueAbout] = useState("");

  const handleChange = (e) => {
    e.target.name === "name"
      ? setValueName(e.target.value)
      : setValueAbout(e.target.value);
  };

  useEffect(() => {
    setValueName(currentUser.name);
    setValueAbout(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      key={0}
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        className="popup__input popup__input_text_name"
        value={valueName}
        onChange={handleChange}
        name="name"
        id="name-profile"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error" id="name-profile-error" />
      <input
        className="popup__input popup__input_text_about-me"
        value={valueAbout}
        onChange={handleChange}
        name="about"
        id="about-profile"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        noValidate
      />
      <span className="popup__error" id="about-profile-error" />
      <button
        className="btn btn_margin_l popup__button popup__button_type_edit"
        type="submit"
        aria-label="сохранить"
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
