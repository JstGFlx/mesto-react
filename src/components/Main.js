import React from "react";
import api from "../utils/Api";
import Card from "../components/Card";

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);
  let userId;

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([info, cards]) => {
        userId = info._id;
        setUserName(info.name);
        setUserDescription(info.about);
        setUserAvatar(info.avatar);
        console.log(cards);
        setCards(cards);
      })
      .catch((err) => {
        //showErrorMassage(err);
      })
      .finally(() => {
        //displayLoadWrapper(false);
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
            <Card
              key={card._id}
              name={card.name}
              src={card.link}
              likes={card.likes.length}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
