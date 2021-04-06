import React from 'react';
import logoPath from '../images/logo/Vector.svg';
import { Link, useHistory } from 'react-router-dom';

function Header(props) {
  const history = useHistory();
  return (
    <header className='header'>
      <img className='header__logo' src={logoPath} alt='логотип место' />
      <div className='header__auth'>
        <p className='header__email'></p>
        <Link
          className={`header__link ${
            props.isLogined && 'header__link_logined'
          }`}
          to={`${
            history.location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'
          }`}
        >
          {history.location.pathname === '/'
            ? 'Выйти'
            : '/sign-up'
            ? 'Регистрация'
            : 'sign-in'
            ? 'Войти'
            : ''}
        </Link>
      </div>
    </header>
  );
}

export default Header;
