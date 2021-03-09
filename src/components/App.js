import { useState } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const handleCardClick = () => {
    setSelectedCard(!selectedCard);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  };
  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />
      <PopupWithForm
        key={0}
        name='edit'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className='popup__input popup__input_text_name'
          name='name'
          id='name-profile'
          type='text'
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          required
        />
        <span className='popup__error' id='name-profile-error'></span>
        <input
          className='popup__input popup__input_text_about-me'
          name='about'
          id='about-profile'
          type='text'
          placeholder='О себе'
          minLength='2'
          maxLength='200'
          required
          noValidate
        />
        <span className='popup__error' id='about-profile-error'></span>
        <button
          className='btn btn_margin_l popup__button popup__button_type_edit'
          type='submit'
          aria-label='сохранить'
        >
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        key={1}
        name='add'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className='popup__input popup__input_text_title'
          name='name'
          id='name-card'
          type='text'
          placeholder='Название'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='popup__error' id='name-card-error'></span>
        <input
          className='popup__input popup__input_text_link'
          name='link'
          id='url-card'
          type='url'
          placeholder='Ссылка на картинку'
          required
        />
        <span className='popup__error' id='url-card-error'></span>
        <button
          className='btn btn_margin_l popup__button popup__button_type_add'
          type='submit'
          aria-label='сохранить'
        >
          Создать
        </button>
      </PopupWithForm>
      <PopupWithForm
        key={2}
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className='popup__input popup__input_text_link'
          name='link'
          id='url-avatar'
          type='url'
          placeholder='Ссылка на картинку'
          required
        />
        <span className='popup__error' id='url-avatar-error'></span>
        <button
          className='btn btn_margin_l popup__button popup__button_type_edit-avatar'
          type='submit'
          aria-label='сохранить'
        >
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        key={3}
        name='delete'
        title='Вы уверены?'
        onClose={closeAllPopups}
      >
        <button
          className='btn btn_margin_s popup__button popup__button_type_delete'
          type='submit'
          aria-label='сохранить'
        >
          Да
        </button>
      </PopupWithForm>
      <ImagePopup />
    </>
  );
}

export default App;
