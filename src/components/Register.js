import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { api } from '../utils/utils';

export const Register = (props) => {
  const [values, setValues] = useState({ password: '', email: '' });
  const [isSendingData, setIsSendingData] = useState(false);
  const history = useHistory();

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
      await api.register(values);
      history.push('/sign-in');
      props.onSubmit('Вы успешно зарегистрировались!', true);
    } catch (err) {
      props.onSubmit(err.message);
    } finally {
      setIsSendingData(false);
    }
  };

  return (
    <form className='auth' onSubmit={handleSubmit}>
      <div className='auth__container'>
        <h2 className='auth__title'>Регистрация</h2>
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
          onChange={handleChange}
          value={values.password}
        />
      </div>
      <div className='auth__container'>
        <button
          className='btn btn_type_auth'
          type='submit'
          disabled={isSendingData}
        >
          {isSendingData ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
        <Link className='auth__link' to='sign-in'>
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </form>
  );
};

export default Register;
