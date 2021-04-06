import React, { useContext, useState, useEffect } from 'react';
import logoPath from '../images/logo/Vector.svg';
import { Link, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { BurgerMenuButton } from './BurgerMenuButton';

function Header(props) {
  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);
  const [isMenuButtonOpen, setIsMenuButtonOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsMenuButtonOpen(!isMenuButtonOpen);
  };

  //код ниже сделан для того, чтобы когда пользователь разлогинивается а потом сразу логинится меню не было открыто
  useEffect(() => {
    if (!props.isLoggedIn) {
      setIsMenuButtonOpen(false);
    }
  }, [props.isLoggedIn]);

  return (
    <header
      className={`header ${
        isMenuButtonOpen && props.isLoggedIn ? 'header_active' : ''
      } ${props.isLoggedIn ? 'header_logged-in' : ''}`}
    >
      <div className='header__container'>
        <img
          className={`header__logo ${
            props.isLoggedIn ? 'header__logo_logged-in' : ''
          }`}
          src={logoPath}
          alt='логотип место'
        />
        <BurgerMenuButton
          onClick={handleMenuButtonClick}
          isClicked={isMenuButtonOpen}
          isLoggedIn={props.isLoggedIn}
        />
      </div>
      <div
        className={`header__auth ${
          props.isLoggedIn ? 'header__auth_logged-in ' : ''
        }`}
      >
        <p className='header__email'>{currentUser?.email}</p>
        <Link
          className={`header__link ${
            props.isLoggedIn ? 'header__link_logined' : ''
          }`}
          to={`${
            history.location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'
          }`}
          onClick={props.onSignOut}
        >
          {props.isLoggedIn
            ? 'Выйти'
            : history.location.pathname === '/sign-in'
            ? 'Регистрация'
            : '/sign-up'
            ? 'Войти'
            : ''}
        </Link>
      </div>
    </header>
  );
}

export default Header;
