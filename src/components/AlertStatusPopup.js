import React, { useEffect } from 'react';
import succesAlertPath from '../images/alert-succes.svg';
import failureAlertPath from '../images/alert-failure.svg';

export const AlertStatusPopup = () => {
  return (
    <div className={`popup popup_type_alert`}>
      <figure className='popup__container popup__container_type_alert'>
        <button
          className='btn btn_type_close'
          type='button'
          aria-label='закрыть'
        />
        <img
          className='popup__status-image'
          src={succesAlertPath}
          alt='Успешная регистрация'
        />
        <h2 className='popup__title popup__title_type_alert'>
          Вы успешно зарегистрировались!
        </h2>
      </figure>
    </div>
  );
};
