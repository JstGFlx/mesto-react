function ImagePopup(props) {
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
