import React from 'react';
import { withRouter } from 'react-router-dom';

const Login = () => {
  return (
    <section className='auth'>
      <div className='auth__container'>
        <h2 className='auth__title'>Вход</h2>
        <input
          className='auth__input'
          type='email'
          name='email'
          placeholder='Email'
        />
        <input
          className='auth__input'
          type='password'
          name='password'
          placeholder='Пароль'
        />
      </div>
      <div className='auth__container'>
        <button className='btn btn_type_auth btn_margin_login'>Войти</button>
      </div>
    </section>
  );
};

export default withRouter(Login);
