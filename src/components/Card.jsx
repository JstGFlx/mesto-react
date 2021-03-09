function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className='card'>
      <button
        className='btn btn_type_delete'
        type='button'
        aria-label='удалить'
      ></button>
      <img
        className='card__image'
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className='card__block'>
        <h2 className='card__name'>{props.card.name}</h2>
        <div className='card_like-container'>
          <button
            className='card__like'
            type='button'
            aria-label='мне нравится'
          />
          <p className='card__like-counter'>{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
