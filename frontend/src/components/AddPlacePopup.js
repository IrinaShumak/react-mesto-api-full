import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup (props) {  
  const nameRef = React.useRef();
  const linkRef = React.useRef(); 
  
  React.useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({
      name: nameRef.current.value, 
      link: linkRef.current.value});         
  } 
  
  return (
    <PopupWithForm 
      name="photo" 
      title = "Новое место" 
      button = "Создать"
      buttonOnLoading = "Создание..." 
      isOpen = {props.isOpen} 
      onClose = {props.onClose}
      onSubmit ={handleSubmit}
    >
      <input 
        id="place-input" 
        type="text" 
        className="popup__input popup__input_field_place" 
        name="name" 
        ref={nameRef} 
        placeholder="Название" 
        required 
        minLength="2" 
        maxLength="30" 
      />
      <span className="place-input-error popup__error"/>
      <input 
        id="url-input" 
        type="url" 
        className="popup__input popup__input_field_link" 
        name="link" 
        ref={linkRef} 
        placeholder="Ссылка на картинку" 
        required 
      />
      <span className="url-input-error popup__error popup__error_bottom"/>
    </PopupWithForm>
  )
}

export default AddPlacePopup;