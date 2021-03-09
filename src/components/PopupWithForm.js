function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <figure className='popup__container'>
        <button
          onClick={props.onClose}
          className='btn btn_type_close'
          type='button'
          aria-label='закрыть'
        ></button>
        <h2 className='popup__title'>{props.title}</h2>
        <form className='popup__form' name={props.name} noValidate>
          {props.children}
        </form>
      </figure>
    </div>
  );
}

export default PopupWithForm;
