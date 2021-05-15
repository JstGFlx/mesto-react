import React, { useState } from 'react';
import { api } from '../utils/utils';

const Login = (props) => {
  const [values, setValues] = useState({ password: '', email: '' });
  const [isSendingData, setIsSendingData] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.password || !values.email) {
      return;
    }
    setIsSendingData(true);
    try {
      await api.login(values);
      setValues({ password: '', email: '' });
      props.onLogin();
    } catch (err) {
      props.onAlert(err.message);
    } finally {
      setIsSendingData(false);
    }
  };

  return (
    <form className='auth' onSubmit={handleSubmit}>
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
        <button
          className='btn btn_type_auth btn_margin_login'
          type='submit'
          disabled={isSendingData}
        >
          {isSendingData ? 'Вход...' : 'Войти'}
        </button>
      </div>
    </form>
  );
};

export default Login;
