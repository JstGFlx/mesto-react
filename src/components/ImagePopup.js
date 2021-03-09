function ImagePopup() {
  return (
    <div className='popup popup_type_img'>
      <figure className='popup__container'>
        <button
          className='btn btn_type_close'
          type='button'
          aria-label='закрыть'
        ></button>
      </figure>
    </div>
  );
}

export default ImagePopup;
