import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
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
      <template className='template'>
        <article className='card'>
          <button
            className='btn btn_type_delete'
            type='button'
            aria-label='удалить'
          ></button>
          <img className='card__image' src='#' alt='#' />
          <div className='card__block'>
            <h2 className='card__name'>123</h2>
            <div className='card_like-container'>
              <button
                className='card__like'
                type='button'
                aria-label='мне нравится'
              ></button>
              <p className='card__like-counter'></p>
            </div>
          </div>
        </article>
      </template>
      <PopupWithForm
        id={0}
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
        id={1}
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
        id={2}
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
        id={3}
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
      <div className='errors'>
        <template className='error__template'>
          <div className='error'>
            <p className='error__massage'></p>
          </div>
        </template>
      </div>
    </>
  );
}

export default App;
