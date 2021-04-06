import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export const Register = () => {
  return (
    <section className='auth'>
      <div className='auth__container'>
        <h2 className='auth__title'>Регистрация</h2>
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
        <button className='btn btn_type_auth'>Зарегистрироваться</button>
        <Link className='auth__link' to='sign-in'>
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </section>
  );
};

export default withRouter(Register);
