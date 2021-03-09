import { useState, useEffect } from "react";
import api from "../utils/api";
import Card from "../components/Card";
import { showErrorMassage } from "../utils/utils";

function Main(props) {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([info, cards]) => {
        setUserName(info.name);
        setUserDescription(info.about);
        setUserAvatar(info.avatar);
        setCards(cards);
      })
      .catch((err) => {
        showErrorMassage(err);
      });
  }, []);

  return (
    <main>
      <section className='profile'>
        <div className='profile__container'>
          <div className='load-wraper load-wraper_type_avatar'>
            <div className='load-wraper__activity'></div>
          </div>
          <div
            className='profile__avatar'
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${userAvatar})` }}
          ></div>
          <div className='profile__info'>
            <div className='load-wraper load-wraper_type_name'>
              <div className='load-wraper__activity'></div>
            </div>
            <h1 className='profile__name'>{userName}</h1>
            <button
              className='btn btn_type_edit'
              type='button'
              aria-label='изменить'
              onClick={props.onEditProfile}
            ></button>
            <div className='load-wraper load-wraper_type_about'>
              <div className='load-wraper__activity'></div>
            </div>
            <p className='profile__about-me'>{userDescription}</p>
          </div>
        </div>
        <button
          className='btn btn_type_add'
          type='button'
          aria-label='добавить'
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className='cards'>
        {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
