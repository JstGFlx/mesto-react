function Main(props) {
  return (
    <main>
      <section className='profile'>
        <div className='profile__container'>
          <div className='load-wraper load-wraper_type_avatar'>
            <div className='load-wraper__activity'></div>
          </div>
          <div className='profile__avatar' onClick={props.onEditAvatar}></div>
          <div className='profile__info'>
            <div className='load-wraper load-wraper_type_name'>
              <div className='load-wraper__activity'></div>
            </div>
            <h1 className='profile__name'>Жак-Ив Кусто</h1>
            <button
              className='btn btn_type_edit'
              type='button'
              aria-label='изменить'
              onClick={props.onEditProfile}
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
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className='cards'></section>
    </main>
  );
}

export default Main;
