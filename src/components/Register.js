import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { authApi } from '../utils/utils';

export const Register = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordlValue] = useState('');

  const handleChangeEmail = (event) => {
    setEmailValue(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPasswordlValue(event.target.value);
  };
  const handleSubmt = (event) => {
    event.preventDefault();
    authApi.register(passwordValue, emailValue);
  };

  return (
    <form className='auth' onSubmit={handleSubmt}>
      <div className='auth__container'>
        <h2 className='auth__title'>Регистрация</h2>
        <input
          className='auth__input'
          type='email'
          name='email'
          placeholder='Email'
          value={emailValue}
          onChange={handleChangeEmail}
        />
        <input
          className='auth__input'
          type='password'
          name='password'
          placeholder='Пароль'
          onChange={handleChangePassword}
          value={passwordValue}
        />
      </div>
      <div className='auth__container'>
        <button className='btn btn_type_auth' type='submit'>
          Зарегистрироваться
        </button>
        <Link className='auth__link' to='sign-in'>
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </form>
  );
};

export default withRouter(Register);
