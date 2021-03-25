import React, { useEffect, useCallback } from 'react';

function PopupWithForm(props) {
  const { isOpen, onClose } = props;

  const handleEcsacePush = useCallback(
    (event) => {
      if (event.key === 'Escape') onClose();
    },
    [onClose]
  );
  const handleOutsideClick = useCallback(
    (event) => {
      if (event.target.classList.contains('popup_opened')) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEcsacePush);
      window.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      window.removeEventListener('keydown', handleEcsacePush);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, handleEcsacePush, handleOutsideClick]);

  return (
    <div
      className={`popup popup_type_${props.name} ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <figure className='popup__container'>
        <button
          onClick={onClose}
          className='btn btn_type_close'
          type='button'
          aria-label='закрыть'
        />
        <h2 className='popup__title'>{props.title}</h2>
        <form
          className='popup__form'
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
        </form>
      </figure>
    </div>
  );
}

export default PopupWithForm;
