import { useState, useEffect, useContext } from "react";
import Card from "./Card.jsx";
import { showErrorMassage, api } from "../utils/utils";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);

  const handleCardLike = (card) => {
    console.log(card);
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        showErrorMassage(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c !== card));
      })
      .catch((err) => {
        showErrorMassage(err);
      });
  };

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        showErrorMassage(err);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="load-wraper load-wraper_type_avatar">
            <div className="load-wraper__activity" />
          </div>
          <div
            className="profile__avatar"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
          <div className="profile__info">
            <div className="load-wraper load-wraper_type_name">
              <div className="load-wraper__activity" />
            </div>
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="btn btn_type_edit"
              type="button"
              aria-label="изменить"
              onClick={props.onEditProfile}
            />
            <div className="load-wraper load-wraper_type_about">
              <div className="load-wraper__activity" />
            </div>
            <p className="profile__about-me">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="btn btn_type_add"
          type="button"
          aria-label="добавить"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="cards">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
