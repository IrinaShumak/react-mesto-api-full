import React from 'react';
import {LoadingProgressContext} from '../contexts/LoadingProgressContext';

function PopupWithForm(props) {

  const isLoading = React.useContext(LoadingProgressContext);   
  
  return (
    
    <div className={props.isOpen ? `popup popup_location_${props.name} popup_opened` : `popup popup_location_${props.name}`}>
      <form 
        className={`popup__form popup__form_location_${props.name}`} 
        action="#" 
        method="post" 
        name={props.name} 
        onSubmit= {props.onSubmit}        
      >
        <button type="button" className="popup__close" onClick={props.onClose} />
        <h3 className={`popup__title popup__title_location_${props.name}`}>{props.title}</h3>
        {props.children}       
        <button 
          type="submit" 
          className={`popup__button popup__button_location_${props.name}`}
        >{isLoading ? props.buttonOnLoading : props.button}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;