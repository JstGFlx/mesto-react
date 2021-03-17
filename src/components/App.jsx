import { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { showErrorMassage, api } from "../utils/utils";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    about: "",
    avatar: "",
    cohort: "",
    name: "",
    _id: "",
  });

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        showErrorMassage(err);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const handleCardClick = ({ name, link }) => {
    setSelectedCard({
      name: name,
      link: link,
    });
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        key={1}
        name="add"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_text_title"
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
      <PopupWithForm
        key={2}
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_text_link"
          name="link"
          id="url-avatar"
          type="url"
          placeholder="Ссылка на картинку"
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
      <PopupWithForm
        key={3}
        name="delete"
        title="Вы уверены?"
        onClose={closeAllPopups}
      >
        <button
          className="btn btn_margin_s popup__button popup__button_type_delete"
          type="submit"
          aria-label="сохранить"
        >
          Да
        </button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
