import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = currentUser?.avatar;    
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 
  
  return (
    <PopupWithForm 
      name="avatar" 
      title = "Обновить аватар" 
      button = "Сохранить"
      buttonOnLoading = "Сохранение..."
      isOpen = {props.isOpen} 
      onClose = {props.onClose} 
      onSubmit ={handleSubmit}
    >
      <input 
        id="avatar-input" 
        type="url" 
        className="popup__input popup__input_field_avatar" 
        name="avatar" 
        ref={avatarRef}         
        required 
      />
      <span className="avatar-input-error popup__error"/> 
    </PopupWithForm>
  )
}

export default EditAvatarPopup;