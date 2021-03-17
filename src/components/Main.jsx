import { useContext } from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="load-wrapper load-wrapper_type_avatar">
            <div className="load-wrapper__activity" />
          </div>
          <div
            className="profile__avatar"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
          <div className="profile__info">
            <div className="load-wrapper load-wrapper_type_name">
              <div className="load-wrapper__activity" />
            </div>
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="btn btn_type_edit"
              type="button"
              aria-label="изменить"
              onClick={props.onEditProfile}
            />
            <div className="load-wrapper load-wrapper_type_about">
              <div className="load-wrapper__activity" />
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
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
