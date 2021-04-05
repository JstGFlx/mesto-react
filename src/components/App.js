import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { showErrorMassage, api } from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { Register } from './Register';
import { Login } from './Login';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(null);
  const [isSendingData, setIsSendingData] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState(null);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const handleCardDeleteClick = (props) => {
    setIsDeletePopupOpen(props);
  };
  const handleCardClick = ({ name, link }) => {
    setIsImagePopupOpen(!isImagePopupOpen);
    setSelectedCard({
      name: name,
      link: link,
    });
  };
  const handleUpdateUser = (data) => {
    setIsSendingData(!isSendingData);
    api
      .pathUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        showErrorMassage(err);
      })
      .finally(() => {
        setIsSendingData(false);
      });
  };
  const handleUpdateAvatar = (data) => {
    setIsSendingData(!isSendingData);
    api
      .patchAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        showErrorMassage(err);
      })
      .finally(() => {
        setIsSendingData(false);
      });
  };
  const handleAddPlaceSubmit = (data) => {
    setIsSendingData(!isSendingData);
    api
      .postNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        showErrorMassage(err);
      })
      .finally(() => {
        setIsSendingData(false);
      });
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setTimeout(() => {
      setSelectedCard(null);
    }, 150);
  };
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        showErrorMassage(err);
      });
  };
  const handleCardDelete = (_id) => {
    setIsSendingData(!isSendingData);
    api
      .deleteCard(_id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== _id));
        closeAllPopups();
      })
      .catch((err) => {
        showErrorMassage(err);
      })
      .finally(() => {
        setIsSendingData(false);
      });
  };

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        showErrorMassage(err);
      });
  }, []);

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      {/* <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        cards={cards}
        onCardDeleteClick={handleCardDeleteClick}
      /> */}
      {/* <Register /> */}
      <Login />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onSendingData={isSendingData}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onSendingData={isSendingData}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onSendingData={isSendingData}
      />
      <DeleteCardPopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        onSendingData={isSendingData}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
