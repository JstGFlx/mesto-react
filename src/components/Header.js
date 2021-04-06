import React, { useContext } from 'react';
import logoPath from '../images/logo/Vector.svg';
import { Link, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header(props) {
  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className='header'>
      <div className='header__container'>
        <img className='header__logo' src={logoPath} alt='логотип место' />
      </div>
      <div className='header__auth'>
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
