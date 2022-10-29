import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);    
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      description,
    });
  }

  return (

    <PopupWithForm 
      name="profile" 
      title = "Редактировать профиль" 
      button = "Сохранить"
      buttonOnLoading = "Сохранение..." 
      isOpen = {props.isOpen} 
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
    >
      <input 
        id="name-input" 
        type="text" 
        className="popup__input popup__input_field_name" 
        name="fullname" 
        value={name || ''} 
        onChange={handleNameChange} 
        required 
        minLength="2" 
        maxLength="40"
      />
      <span className="name-input-error popup__error" />
      <input 
        id="description-input" 
        type="text" 
        className="popup__input popup__input_field_description" 
        name="description" 
        value={description || ''} 
        onChange={handleDescriptionChange} 
        required 
        minLength="2" 
        maxLength="200"
      />
      <span className="description-input-error popup__error popup__error_bottom"/>
    </PopupWithForm>
  )
}

export default EditProfilePopup;