import React, { useState, useEffect } from 'react';
import logoPath from '../images/logo/Vector.svg';
import { Link, Switch, Route } from 'react-router-dom';
import { BurgerMenuButton } from './BurgerMenuButton';

function Header(props) {
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
        <Switch>
          <Route path='/sign-up'>
            <Link className='header__link' to='sign-in'>
              Войти
            </Link>
          </Route>
          <Route path='/sign-in'>
            <Link className='header__link' to='sign-up'>
              Регистрация
            </Link>
          </Route>
          <Route exact path='/'>
            <p className='header__email'>{props.email}</p>
            <Link
              className='header__link header__link_logined'
              to='signin'
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
