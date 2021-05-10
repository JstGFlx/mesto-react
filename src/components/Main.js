import React, { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import SkeletonLoader from './SkeletonLoader.js';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className='profile'>
        <div className='profile__container'>
          {!currentUser && (
            <SkeletonLoader width='120' height='120' radius='50%' />
          )}
          {currentUser && (
            <div
              className='profile__avatar'
              onClick={props.onEditAvatar}
              style={{
                backgroundImage: `url(${currentUser.avatar})`,
              }}
            />
          )}
          <div className='profile__info'>
            {!currentUser && (
              <SkeletonLoader width='188' height='33' radius='10' />
            )}
            {currentUser && (
              <h1 className='profile__name'>{currentUser.name}</h1>
            )}
            <button
              className='btn btn_type_edit'
              type='button'
              aria-label='изменить'
              onClick={props.onEditProfile}
              disabled={!currentUser}
            />
            {!currentUser && (
              <SkeletonLoader width='203' height='17' radius='10' />
            )}
            {currentUser && (
              <p className='profile__about-me'>{currentUser.about}</p>
            )}
          </div>
        </div>
        <button
          className='btn btn_type_add'
          type='button'
          aria-label='добавить'
          onClick={props.onAddPlace}
          disabled={!currentUser}
        />
      </section>
      <section className='cards'>
        {!props.cards && (
          <SkeletonLoader width='100%' height='363' radius='10' />
        )}
        {!props.cards && (
          <SkeletonLoader width='100%' height='363' radius='10' />
        )}
        {!props.cards && (
          <SkeletonLoader width='100%' height='363' radius='10' />
        )}
        {!props.cards && (
          <SkeletonLoader width='100%' height='363' radius='10' />
        )}
        {!props.cards && (
          <SkeletonLoader width='100%' height='363' radius='10' />
        )}
        {!props.cards && (
          <SkeletonLoader width='100%' height='363' radius='10' />
        )}

        {props.cards &&
          currentUser &&
          props.cards.reverse().map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDeleteClick={props.onCardDeleteClick}
              />
            );
          })}
      </section>
    </main>
  );
}

export default Main;
