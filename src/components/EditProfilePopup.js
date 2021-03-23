import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

function EditProfilePopup(props) {
  const { register, handleSubmit, errors } = useForm();
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const handleChange = (e) => {
    e.target.name === 'name'
      ? setName(e.target.value)
      : setAbout(e.target.value);
  };
  const onSubmit = () => {
    props.onUpdateUser({
      name,
      about,
    });
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser]);

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
        value={name}
        onChange={handleChange}
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
        value={about}
        onChange={handleChange}
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
        className='btn btn_margin_l popup__button popup__button_type_edit'
        type='submit'
        aria-label='сохранить'
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
