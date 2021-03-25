import { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

function EditProfilePopup(props) {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    getValues,
    formState,
    trigger,
    setValue,
  } = useForm({
    mode: 'all',
  });
  const { isValid } = formState;

  const currentUser = useContext(CurrentUserContext);

  const onSubmit = () => {
    props.onUpdateUser(getValues());
    trigger();
  };

  useEffect(() => {
    if (props.isOpen) {
      setValue('name', currentUser.name);
      setValue('about', currentUser.about);
      trigger();
    } else {
      reset();
    }
  }, [props.isOpen, reset, trigger, setValue, currentUser]);

  return (
    <PopupWithForm
      key={0}
      name='edit'
      title='Редактировать профиль'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className='popup__input popup__input_text_name'
        name='name'
        type='text'
        placeholder='Имя'
        ref={register({
          required: 'Пожалуйста, заполните это поле.',
          minLength: {
            value: 2,
            message: 'Пожалуйста, напишите имя длиннее одной буквы.',
          },
          maxLength: {
            value: 40,
            message: 'Слишком длинное имя.',
          },
        })}
      />
      {errors.name && (
        <span className='popup__error'>{errors.name.message}</span>
      )}

      <input
        className='popup__input popup__input_text_about-me'
        name='about'
        type='text'
        placeholder='О себе'
        ref={register({
          required: 'Пожалуйста, заполните это поле.',
          minLength: {
            value: 2,
            message: 'Слишком мало информации о себе. Напишите что-нибудь еще.',
          },
          maxLength: {
            value: 200,
            message: 'Слишком много информации о себе.',
          },
        })}
      />
      {errors.about && (
        <span className='popup__error'>{errors.about.message}</span>
      )}
      <button
        className={`btn btn_margin_l popup__button popup__button_type_add ${
          !isValid && 'popup__button_disabled'
        }`}
        type='submit'
        aria-label='сохранить'
        disabled={!isValid}
      >
        {props.onSendingData ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
