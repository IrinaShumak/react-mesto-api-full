import React from 'react';
import PopupWithForm from './PopupWithForm';


function DeleteCardPopup (props) {   

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onCardDelete(props.card);
  } 
  
  return (
    <PopupWithForm 
      name="trash" 
      title = "Вы уверены?" 
      button = "Да"
      buttonOnLoading = "Удаление..."
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit ={handleSubmit}
    />
  )
}

export default DeleteCardPopup;