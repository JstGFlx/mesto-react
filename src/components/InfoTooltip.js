import React, { useEffect } from 'react';
import succesAlertPath from '../images/alert-succes.svg';
import failureAlertPath from '../images/alert-failure.svg';

export const InfoTooltip = (props) => {
  const { isOpen, onClose } = props;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('popup_opened')) onClose();
    };

    const handleEcsacePush = (event) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEcsacePush);
      window.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      window.removeEventListener('keydown', handleEcsacePush);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup popup_type_alert ${
        isOpen?.isOpen ? 'popup_opened' : ''
      }`}
    >
      <figure className='popup__container popup__container_type_alert'>
        <button
          className='btn btn_type_close'
          type='button'
          aria-label='закрыть'
          onClick={onClose}
        />
        <img
          className='popup__status-image'
          src={isOpen?.status ? succesAlertPath : failureAlertPath}
          alt='Успешная регистрация'
        />
        <h2 className='popup__title popup__title_type_alert'>
          {isOpen?.status
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так!Попробуйте ещё раз.'}
        </h2>
      </figure>
    </div>
  );
};
