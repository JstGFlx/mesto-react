import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
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
    props.onUpdateAvatar(getValues());
    trigger();
  };

  useEffect(() => {
    reset();
  }, [props.isOpen, reset]);

  return (
    <PopupWithForm
      key={2}
      name='avatar'
      title='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className='popup__input popup__input_text_link'
        name='avatar'
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
        {props.onSendingData ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
