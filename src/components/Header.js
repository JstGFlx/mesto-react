import React from 'react';
import logoPath from '../images/logo/Vector.svg';
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();
  return (
    <header className='header'>
      <img className='header__logo' src={logoPath} alt='логотип место' />
      <div className='header__auth'>
        <p className='header__email'>email@mail.com</p>
        <Link
          className='header__link'
          to={`${
            history.location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'
          }`}
        >
          {history.location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}
        </Link>
      </div>
    </header>
  );
}

export default Header;
