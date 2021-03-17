import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  return (
    <PopupWithForm
      key={3}
      name="delete"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <button
        className="btn btn_margin_s popup__button popup__button_type_delete"
        type="submit"
        aria-label="сохранить"
      >
        Да
      </button>
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
