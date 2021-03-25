import { useEffect } from 'react';

function ImagePopup(props) {
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
      className={`popup popup_type_img ${props.isOpen ? 'popup_opened' : ''}`}
    >
      <figure className='popup__wrapper'>
        <button
          className='btn btn_type_close'
          type='button'
          aria-label='закрыть'
          onClick={props.onClose}
        />
        <img
          className='popup__image'
          src={props.card && props.card.link}
          alt={props.card && props.card.name}
        />
        <p className='popup__description'>{props.card && props.card.name}</p>
      </figure>
    </div>
  );
}

export default ImagePopup;
