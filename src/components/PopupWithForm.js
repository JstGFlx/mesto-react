function PopupWithForm() {
  return (
    <div className='popup popup_type_add'>
      <div className='popup__container'>
        <button
          className='btn btn_type_close'
          type='button'
          aria-label='закрыть'
        ></button>
        <h2 className='popup__title'>Новое место</h2>
        <form className='popup__form' name='add-new-card' noValidate>
          <input
            className='popup__input popup__input_text_title'
            name='name'
            id='name-card'
            type='text'
            placeholder='Название'
            minLength='2'
            maxLength='30'
            required
          />
          <span className='popup__error' id='name-card-error'></span>
          <input
            className='popup__input popup__input_text_link'
            name='link'
            id='url-card'
            type='url'
            placeholder='Ссылка на картинку'
            required
          />
          <span className='popup__error' id='url-card-error'></span>
          <button
            className='btn btn_margin_l popup__button popup__button_type_add'
            type='submit'
            aria-label='сохранить'
          >
            Создать
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
