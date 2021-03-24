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
        ref={register({ required: true, minLength: 2, maxLength: 40 })}
      />
      {errors.name && errors.name.type === 'required' && (
        <span className='popup__error'>Пожалуйста, заполните это поле.</span>
      )}
      {errors.name && errors.name.type === 'minLength' && (
        <span className='popup__error'>
          Пожалуйста, напишите имя длиннее одной буквы.
        </span>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <span className='popup__error'>Слишком длинное имя.</span>
      )}

      <input
        className='popup__input popup__input_text_about-me'
        name='about'
        type='text'
        placeholder='О себе'
        ref={register({ required: true, minLength: 2, maxLength: 200 })}
      />
      {errors.about && errors.about.type === 'required' && (
        <span className='popup__error'>Пожалуйста заполните это поле.</span>
      )}
      {errors.about && errors.about.type === 'minLength' && (
        <span className='popup__error'>
          Слишком мало информации о себе. Напишите что-нибудь еще.
        </span>
      )}
      {errors.about && errors.about.type === 'maxLength' && (
        <span className='popup__error'>Слишком много информации о себе.</span>
      )}
      <button
        className={`btn btn_margin_l popup__button popup__button_type_add ${
          !isValid && 'popup__button_disabled'
        }`}
        type='submit'
        aria-label='сохранить'
        disabled={!isValid}
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
