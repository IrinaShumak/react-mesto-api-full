import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main (props) {  
  
  const currentUser = React.useContext(CurrentUserContext);
  console.log(props.cards);

  return (
    <main className="content">
    
      <section className="profile">
        <div className="profile__avatar">
          <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar} />
          <div style = {{backgroundImage: `url(${currentUser?.avatar})`}} className="profile__image" />
        </div>
        <div className="profile-info">
          <div className="profile-info__main-info">
            <h1 className="profile-info__name">{currentUser?.name}</h1>
            <button type="button" className="profile-info__edit-button" onClick={props.onEditProfile} />
          </div>
          <p className="profile-info__description">{currentUser?.about}</p>            
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace} />
      </section>      

      <section className="elements">
        {props.cards.map((cardItem) => {
           return (<Card 
            key={cardItem._id} 
            card = {cardItem} 
            onCardClick = {props.onCardClick} 
            onCardLike = {props.onCardLike}            
            onTrashClick = {props.onTrashClick}
            />)
          })
        }
      </section>  
    </main>
  );
}

export default Main;