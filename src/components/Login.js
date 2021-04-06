import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { authApi, showErrorMassage } from '../utils/utils';

const Login = (props) => {
  const [values, setValues] = useState({ password: '', email: '' });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmt = (event) => {
    event.preventDefault();
    if (!values.password || !values.email) {
      return;
    }
    authApi
      .login(values)
      .then((res) => {
        setValues({ password: '', email: '' });
        localStorage.setItem('token', res.token);
        props.onLogin();
      })
      .catch((err) => {
        showErrorMassage(err);
      });
  };

  return (
    <form className='auth' onSubmit={handleSubmt}>
      <div className='auth__container'>
        <h2 className='auth__title'>Вход</h2>
        <input
          className='auth__input'
          type='email'
          name='email'
          placeholder='Email'
          value={values.email}
          onChange={handleChange}
        />
        <input
          className='auth__input'
          type='password'
          name='password'
          placeholder='Пароль'
          value={values.password}
          onChange={handleChange}
        />
      </div>
      <div className='auth__container'>
        <button className='btn btn_type_auth btn_margin_login' type='submit'>
          Войти
        </button>
      </div>
    </form>
  );
};

export default withRouter(Login);
