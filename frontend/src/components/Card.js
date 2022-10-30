import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card (props) {

  const currentUser = React.useContext(CurrentUserContext);
  
  const isOwn = props.card.owner?._id === currentUser?._id;
  const cardDeleteButtonClassName = (
    `element__trash-button ${isOwn && 'element__trash-button_visible'}`
  );

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && 'element__like-button_active'}`
  );

  function handleClick () {    
    props.onCardClick(props.card);
  }

  function handleLike () {    
    props.onCardLike(props.card);
  }

  function handleDeleteClick () {    
    props.onTrashClick(props.card);
  }

  
  return (    
    <div className="element">
      <div className="element__inner">          
        <div
          className="element__photo" 
          style = {{backgroundImage: `url(${props.card.link})`}} 
          onClick={handleClick}/>
      </div>
        <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}/>  
        <div className="element__description">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-container">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLike}/>
            <p className="element__like-counter">{props.card.likes.length}</p>
          </div>        
        </div>
    </div>      
  );
}

export default Card;