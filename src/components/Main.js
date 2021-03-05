function Main() {
  const handleEditAvatarClick = () => {
    const popupTypeAvatar = document.querySelector(".popup_type_avatar");
    popupTypeAvatar.classList.add("popup_opened");
  };
  const handleEditProfileClick = () => {
    const popupTypeProfile = document.querySelector(".popup_type_edit");
    popupTypeProfile.classList.add("popup_opened");
  };
  const handleAddPlaceClick = () => {
    const popupTypeAdd = document.querySelector(".popup_type_add");
    popupTypeAdd.classList.add("popup_opened");
  };
  return (
    <main>
      <section className='profile'>
        <div className='profile__container'>
          <div className='load-wraper load-wraper_type_avatar'>
            <div className='load-wraper__activity'></div>
          </div>
          <div
            className='profile__avatar'
            onClick={handleEditAvatarClick}
          ></div>
          <div className='profile__info'>
            <div className='load-wraper load-wraper_type_name'>
              <div className='load-wraper__activity'></div>
            </div>
            <h1 className='profile__name'>Жак-Ив Кусто</h1>
            <button
              className='btn btn_type_edit'
              type='button'
              aria-label='изменить'
              onClick={handleEditProfileClick}
            ></button>
            <div className='load-wraper load-wraper_type_about'>
              <div className='load-wraper__activity'></div>
            </div>
            <p className='profile__about-me'>Исследователь океана</p>
          </div>
        </div>
        <button
          className='btn btn_type_add'
          type='button'
          aria-label='добавить'
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      <section className='cards'>
        <div className='load-wraper load-wraper_type_card'>
          <div className='load-wraper__activity'></div>
        </div>
        <div className='load-wraper load-wraper_type_card'>
          <div className='load-wraper__activity'></div>
        </div>
        <div className='load-wraper load-wraper_type_card'>
          <div className='load-wraper__activity'></div>
        </div>
        <div className='load-wraper load-wraper_type_card'>
          <div className='load-wraper__activity'></div>
        </div>
        <div className='load-wraper load-wraper_type_card'>
          <div className='load-wraper__activity'></div>
        </div>
        <div className='load-wraper load-wraper_type_card'>
          <div className='load-wraper__activity'></div>
        </div>
      </section>
    </main>
  );
}

export default Main;
