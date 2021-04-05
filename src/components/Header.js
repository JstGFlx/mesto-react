import React from 'react';
import logoPath from '../images/logo/Vector.svg';

function Header() {
  return (
    <header className='header'>
      <img className='header__logo' src={logoPath} alt='логотип место' />
      <div className='header__auth'>
        <p className='header__email'>email@mail.com</p>
        <p className='header__login'>Войти</p>
      </div>
    </header>
  );
}

export default Header;
