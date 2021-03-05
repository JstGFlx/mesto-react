import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <template className='template'>
        <article className='card'>
          <button
            className='btn btn_type_delete'
            type='button'
            aria-label='удалить'
          ></button>
          <img className='card__image' src='#' alt='#' />
          <div className='card__block'>
            <h2 className='card__name'>123</h2>
            <div className='card_like-container'>
              <button
                className='card__like'
                type='button'
                aria-label='мне нравится'
              ></button>
              <p className='card__like-counter'></p>
            </div>
          </div>
        </article>
      </template>
      <div className='popup popup_type_edit'>
        <div className='popup__container'>
          <button
            className='btn btn_type_close'
            type='button'
            aria-label='закрыть'
          ></button>
          <h2 className='popup__title'>Редактировать профиль</h2>
          <form className='popup__form' name='edit-profile' noValidate>
            <input
              className='popup__input popup__input_text_name'
              name='name'
              id='name-profile'
              type='text'
              placeholder='Имя'
              minLength='2'
              maxLength='40'
              required
            />
            <span className='popup__error' id='name-profile-error'></span>
            <input
              className='popup__input popup__input_text_about-me'
              name='about'
              id='about-profile'
              type='text'
              placeholder='О себе'
              minLength='2'
              maxLength='200'
              required
              noValidate
            />
            <span className='popup__error' id='about-profile-error'></span>
            <button
              className='btn btn_margin_l popup__button popup__button_type_edit'
              type='submit'
              aria-label='сохранить'
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
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
      <div className='popup popup_type_avatar'>
        <div className='popup__container'>
          <button
            className='btn btn_type_close'
            type='button'
            aria-label='закрыть'
          ></button>
          <h2 className='popup__title'>Обновить аватар</h2>
          <form className='popup__form' name='change-avatar' noValidate>
            <input
              className='popup__input popup__input_text_link'
              name='link'
              id='url-avatar'
              type='url'
              placeholder='Ссылка на картинку'
              required
            />
            <span className='popup__error' id='url-avatar-error'></span>
            <button
              className='btn btn_margin_l popup__button popup__button_type_edit-avatar'
              type='submit'
              aria-label='сохранить'
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
      <div className='popup popup_type_img'>
        <div className='popup__wrapper'>
          <button
            className='btn btn_type_close'
            type='button'
            aria-label='закрыть'
          ></button>
          <img className='popup__image' src='#' alt='#' />
          <p className='popup__description'></p>
        </div>
      </div>
      <div className='popup popup_type_delete'>
        <div className='popup__container'>
          <button
            className='btn btn_type_close'
            type='button'
            aria-label='закрыть'
          ></button>
          <h2 className='popup__title'>Вы уверены?</h2>
          <button
            className='btn btn_margin_s popup__button popup__button_type_delete'
            type='button'
            aria-label='сохранить'
          >
            Да
          </button>
        </div>
      </div>
      <div className='errors'>
        <template className='error__template'>
          <div className='error'>
            <p className='error__massage'></p>
          </div>
        </template>
      </div>
    </>
  );
}

export default App;
