import React, { useContext, useState, useEffect } from 'react';
import logoPath from '../images/logo/Vector.svg';
import { Link, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { BurgerMenuButton } from './BurgerMenuButton';

function Header(props) {
  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);
  const [isMenuButtonOpen, setIsMenuButtonOpen] = useState(false);
  useEffect(() => {
    console.log(props.isLogined);
  }, [props.isLogined]);

  const handleMenuButtonClick = () => {
    setIsMenuButtonOpen(!isMenuButtonOpen);
  };

  return (
    <header
      className={`header ${
        isMenuButtonOpen && props.isLogined ? 'header_active' : ''
      } ${props.isLogined ? 'header_logged-in' : ''}`}
    >
      <div className='header__container'>
        <img
          className={`header__logo ${
            props.isLogined ? 'header__logo_logged-in' : ''
          }`}
          src={logoPath}
          alt='логотип место'
        />
        <BurgerMenuButton
          onClick={handleMenuButtonClick}
          isClicked={isMenuButtonOpen}
          isLoggedIn={props.isLogined}
        />
      </div>
      <div
        className={`header__auth ${
          props.isLogined ? 'header__auth_logged-in ' : ''
        }`}
      >
        <p className='header__email'>{currentUser?.email}</p>
        <Link
          className={`header__link ${
            props.isLogined ? 'header__link_logined' : ''
          }`}
          to={`${
            history.location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'
          }`}
          onClick={props.onSignOut}
        >
          {props.isLogined
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
