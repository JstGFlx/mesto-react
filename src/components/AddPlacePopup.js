import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

function AddPlacePopup(props) {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    getValues,
    formState,
    trigger,
  } = useForm({
    mode: 'all',
  });

  const { isValid } = formState;

  const onSubmit = () => {
    props.onAddPlace(getValues());
    trigger();
  };

  useEffect(() => {
    reset();
  }, [props.isOpen, reset]);

  return (
    <PopupWithForm
      key={1}
      name='add'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className='popup__input popup__input_text_title'
        name='name'
        type='text'
        placeholder='Название'
        ref={register({
          required: 'Пожалуйста, заполните это поле.',
          minLength: {
            value: 2,
            message: 'Пожалуйста, введите название длинее одной буквы.',
          },
          maxLength: {
            value: 30,
            message: 'Слишком длинное название.',
          },
        })}
      />
      {errors.name && (
        <span className='popup__error'>{errors.name.message}</span>
      )}
      <input
        className='popup__input popup__input_text_link'
        name='link'
        type='url'
        placeholder='Ссылка на картинку'
        ref={register({
          required: 'Пожалуйста, заполните это поле.',
          pattern: {
            value: /^https?:\/\//,
            message: 'Пожалуйста, введите URL в формате https:// ...',
          },
        })}
      />
      {errors.link && (
        <span className='popup__error'>{errors.link.message}</span>
      )}
      <button
        className={`btn btn_margin_l popup__button popup__button_type_add ${
          !isValid && 'popup__button_disabled'
        }`}
        type='submit'
        aria-label='сохранить'
        disabled={!isValid}
      >
        {props.onSendingData ? 'Создание...' : 'Создать'}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
