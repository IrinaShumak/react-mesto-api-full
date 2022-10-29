import React from 'react';

function ImagePopup (props) {

  return (  
    <div className={(props.isOpen) ? "popup popup_location_element popup_opened" : "popup popup_location_element"}>
      <div className="popup__content">
        <button type="button" className="popup__close" onClick={props.onClose} />   
        <img src={props.card?.link} alt={props.card?.name} className="popup__photo"/>
        <h2 className="popup__image-heading">{props.card?.name}</h2>
      </div> 
    </div>
  )
}

export default ImagePopup;