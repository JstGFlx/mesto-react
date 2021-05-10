import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { showErrorMassage, api, authApi } from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Register from './Register';
import Login from './Login';
import { InfoTooltip } from './InfoTooltip';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(null);
  const [isSendingData, setIsSendingData] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [cards, setCards] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

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
  const handleAlert = (status) => {
    setIsInfoTooltip({ isOpen: true, status });
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
    setIsDeletePopupOpen(null);
    setIsImagePopupOpen(false);
    setIsInfoTooltip((state) => {
      return { ...state, isOpen: false };
    });
    setTimeout(() => {
      setIsInfoTooltip(null);
      setSelectedCard(null);
    }, 150);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state?.map((c) => (c._id === card._id ? newCard : c))
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

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      authApi.getContent(jwt).then((res) => {
        setEmail(res.data.email);
        handleLogin();
        history.push('/');
      });
    }
  };

  const handleSignOut = () => {
    if (loggedIn) {
      localStorage.removeItem('token');
      history.push('/sign-in');
      setEmail(null);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res.data);
        })
        .catch((err) => {
          showErrorMassage(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          showErrorMassage(err);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={loggedIn} onSignOut={handleSignOut} email={email} />

      <Switch>
        <Route path='/sign-up'>
          <Register onSubmit={handleAlert} />
        </Route>
        <Route path='/sign-in'>
          <Login onLogin={handleTokenCheck} />
        </Route>
        <ProtectedRoute
          path='/'
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDeleteClick={handleCardDeleteClick}
        />
        <Route path='/'>
          {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
        </Route>
      </Switch>
      <Footer />
      <InfoTooltip
        isOpen={isInfoTooltip}
        onClose={closeAllPopups}
        massage={
          isInfoTooltip?.status
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так!Попробуйте ещё раз.'
        }
      />
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
