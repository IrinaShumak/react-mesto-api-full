import React from 'react';

function InfoTooltip(props) {

  return (    
    <div className={props.isOpen ? `popup popup_location_${props.name} popup_opened` : `popup popup_location_${props.name}`}>
      <div className="popup__form">
        <button type="button" className="popup__close" onClick={props.onClose} />
        <div className="popup__confirmation-sign-up" style={{ backgroundImage: `url(${props.background})` }}/>
        <h3 className={`popup__title popup__title_location_${props.name}`}>{props.title}</h3>
      </div>      
    </div>
  );
}

export default InfoTooltip;