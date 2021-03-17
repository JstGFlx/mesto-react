import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const link = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: link.current.value,
    });
  };

  return (
    <PopupWithForm
      key={2}
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_text_link"
        name="link"
        id="url-avatar"
        type="url"
        placeholder="Ссылка на картинку"
        ref={link}
        required
      />
      <span className="popup__error" id="url-avatar-error" />
      <button
        className="btn btn_margin_l popup__button popup__button_type_edit-avatar"
        type="submit"
        aria-label="сохранить"
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
