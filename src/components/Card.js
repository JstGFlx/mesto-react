export default function Card(props) {
  return (
    <article className='card'>
      <button
        className='btn btn_type_delete'
        type='button'
        aria-label='удалить'
      ></button>
      <img className='card__image' src={props.src} alt={props.name} />
      <div className='card__block'>
        <h2 className='card__name'>{props.name}</h2>
        <div className='card_like-container'>
          <button
            className='card__like'
            type='button'
            aria-label='мне нравится'
          ></button>
          <p className='card__like-counter'>{props.likes}</p>
        </div>
      </div>
    </article>
  );
}
