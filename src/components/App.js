import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { showErrorMessage, api } from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Register from './Register';
import Login from './Login';
import { InfoTooltip } from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import '../index.css';

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
  const handleAlert = (message, status) => {
    setIsInfoTooltip({ isOpen: true, message, status });
  };
  const handleCardClick = ({ name, link }) => {
    setIsImagePopupOpen(!isImagePopupOpen);
    setSelectedCard({
      name: name,
      link: link,
    });
  };
  const handleUpdateUser = async (data) => {
    setIsSendingData(!isSendingData);
    try {
      const response = await api.pathUserInfo(data);
      setCurrentUser(response.data);
      closeAllPopups();
    } catch (err) {
      handleAlert(err.message);
    } finally {
      setIsSendingData(false);
    }
  };

  const handleUpdateAvatar = async (data) => {
    setIsSendingData(!isSendingData);
    try {
      const response = await api.patchAvatar(data);
      setCurrentUser(response.data);
      closeAllPopups();
    } catch (err) {
      handleAlert(err.message);
    } finally {
      setIsSendingData(false);
    }
  };

  const handleAddPlaceSubmit = async (data) => {
    setIsSendingData(!isSendingData);
    try {
      const response = await api.postNewCard(data);
      setCards([response.data, ...cards]);
      closeAllPopups();
    } catch (err) {
      handleAlert(err.message);
    } finally {
      setIsSendingData(false);
    }
  };

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    try {
      const response = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) =>
        state.map((c) => (c._id === card._id ? response.data : c))
      );
    } catch (err) {
      handleAlert(err.message);
    }
  };

  const handleCardDelete = async (_id) => {
    setIsSendingData(!isSendingData);
    try {
      await api.deleteCard(_id);
      setCards((state) => state.filter((c) => c._id !== _id));
      closeAllPopups();
    } catch (err) {
      handleAlert(err.message);
    } finally {
      setIsSendingData(false);
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleTokenCheck = async () => {
    try {
      const response = await api.getContent();
      setEmail(response.data.email);
      handleLogin();
      history.push('/');
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSignOut = async () => {
    if (loggedIn) {
      try {
        await api.logout();
        history.push('/sign-in');
        setEmail(null);
        setLoggedIn(false);
      } catch (err) {
        handleAlert(err.message);
      }
    }
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

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res.data.reverse());
        })
        .catch((err) => {
          showErrorMessage(err);
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
          showErrorMessage(err);
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
          <Login onLogin={handleTokenCheck} onAlert={handleAlert} />
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
        message={isInfoTooltip?.message}
        status={isInfoTooltip?.status}
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
