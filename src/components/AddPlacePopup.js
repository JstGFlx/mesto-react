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
        ref={register({ required: true, minLength: 2, maxLength: 30 })}
      />
      {errors.name && errors.name.type === 'required' && (
        <span className='popup__error'>Пожалуйста, заполните это поле.</span>
      )}
      {errors.name && errors.name.type === 'minLength' && (
        <span className='popup__error'>
          Пожалуйста, введите название длинее одной буквы.
        </span>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <span className='popup__error'>Слишком длинное название.</span>
      )}
      <input
        className='popup__input popup__input_text_link'
        name='link'
        type='url'
        placeholder='Ссылка на картинку'
        ref={register({
          required: true,
          pattern: {
            value: /^https?:\/\//,
            message: 'Пожалуйста, введите URL в формате https:// ...',
          },
        })}
      />
      {errors.link && errors.link.type === 'required' && (
        <span className='popup__error'>Пожалуйста, заполните это поле.</span>
      )}
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
