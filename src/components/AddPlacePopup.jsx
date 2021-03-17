import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  };

  const handleChange = (e) => {
    e.target.name === "name"
      ? setName(e.target.value)
      : setLink(e.target.value);
  };

  return (
    <PopupWithForm
      key={1}
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_text_title"
        value={name}
        onChange={handleChange}
        name="name"
        id="name-card"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error" id="name-card-error" />
      <input
        className="popup__input popup__input_text_link"
        value={link}
        onChange={handleChange}
        name="link"
        id="url-card"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error" id="url-card-error" />
      <button
        className="btn btn_margin_l popup__button popup__button_type_add"
        type="submit"
        aria-label="сохранить"
      >
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
