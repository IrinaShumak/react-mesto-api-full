import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Menu from './Menu';
import {api} from '../utils/Api';
import {getContent} from '../utils/auth';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeleteCardPopup from './DeleteCardPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {LoadingProgressContext} from '../contexts/LoadingProgressContext';
import {Route, Switch, useHistory} from 'react-router-dom';


function App () {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [cardForDeletion, setCardForDeletion] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [confirmationMessage, setConfirmationMessage] = React.useState('');
  const [confirmationIcon, setConfirmationIcon] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = React.useState(false);
  const history = useHistory();
  

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleTrashClick = (cardData) => {
    setIsDeletePopupOpen(true);
    setCardForDeletion(cardData);
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
  }  

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setCardForDeletion(null);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(false);
    setConfirmationMessage('');
    setConfirmationIcon('');  
  }
  
  function handleUpdateUser ({name, description}) {
    setIsLoading(true);    
    api.updateProfileInfo({name, description})
      .then((data) => {      
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка. Данные не обновлены: ', err); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar ({avatar}) {
    setIsLoading(true);
    api.updateAvatar({avatar})
      .then((data) => {      
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка. Аватар не обновлён: ', err); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit ({name, link}) {
    setIsLoading(true);
    api.addNewCards ({name, link})
      .then(({data}) => {      
        setCards([data, ...cards]);
        closeAllPopups();        
      })
      .catch((err) => {
        console.log('Ошибка. Карточка не добавлена: ', err); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {    
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    console.log (currentUser._id);
    console.log (currentUser, isLiked);
    const method = !isLiked ? "PUT" : "DELETE";
    api.likePhoto(card._id, method)
      .then(({data}) => {
        setCards((state) => state.map((c) => c._id === card._id ? data : c));
      })
      .catch((err) => {
        console.log('Ошибка. Лайк не сработал: ', err); 
      })
  } 

  function handleCardDelete(card) {
    setIsLoading(true);    
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();        
      })
      .catch((err) => {
        console.log('Ошибка. Карточка не удалена: ', err); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin (value) {
    setIsLoggedIn(value);
  }

  function handleShowConfirmation (confirmationText, confirmationIcon) {
    setIsConfirmationPopupOpen(true);
    setConfirmationMessage(confirmationText);
    setConfirmationIcon(confirmationIcon);
  }

  function handleUserEmail (email) {
    setUserEmail(email);
  }

  function handleDropDownMenuOpening (){
    setIsDropDownMenuOpen(true);
  }

  function handleDropDownMenuClosing (){
    setIsDropDownMenuOpen(false);
  }

  function checkToken () {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    const jwt = localStorage.getItem('jwt');
    if (jwt){            
      // проверяем токен
      getContent(jwt)
        .then((data) => {          
          handleLogin(true);
          history.push("/");
          handleUserEmail (data.data.email);
        })
        .catch((err) => {
          console.log('Пользователь не авторизован: ', err);        
        })           
    }
  } 

  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/signin');
    handleDropDownMenuClosing ();
    handleLogin(false);
  }     
    
    
  React.useEffect(() => {
    if (isLoggedIn) {        
      api.getInitialCards()
        .then(({data}) => {
          setCards(data)
        })
        .catch((err) => {
          console.log('Ошибка. Карточки не могут быть загружены: ', err);
        }); 
    }     
  }, [isLoggedIn])

  React.useEffect(() => {
    if (isLoggedIn) {       
      api.takeUserInfo()
        .then(({data}) => {         
          setCurrentUser(data);    
        })        
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
    }    
  }, [isLoggedIn])

  React.useEffect(() => {
    checkToken();  
  }, [])  

  return (
    <CurrentUserContext.Provider value={currentUser}>      
      <div className="page">
        {isDropDownMenuOpen && (<Menu email={userEmail} signOut={signOut} location={'outside'}/>)}  
        <Header 
          email={userEmail} 
          signOut={signOut}
          isOpen ={isDropDownMenuOpen} 
          onOpen={handleDropDownMenuOpening} 
          onClose={handleDropDownMenuClosing}
        />  
        <Switch>
          <Route path="/signin">          
            <Login 
              name="login" 
              handleLogin={handleLogin} 
              handleUserEmail={handleUserEmail} 
              handleShowConfirmation={handleShowConfirmation} 
            />          
          </Route>
          <Route path="/signup">          
            <Register name="register" handleShowConfirmation={handleShowConfirmation}/>          
          </Route>        
          <ProtectedRoute loggedIn={isLoggedIn}>        
            <Main 
              onEditProfile = {handleEditProfileClick} 
              onAddPlace = {handleAddPlaceClick} 
              onEditAvatar = {handleEditAvatarClick}
              onCardClick = {handleCardClick}
              cards = {cards}
              onCardLike = {handleCardLike}
              onTrashClick = {handleTrashClick}          
            />
            <Footer />
          </ProtectedRoute>
        </Switch>        

        <LoadingProgressContext.Provider value={isLoading}>        
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace = {handleAddPlaceSubmit}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser = {handleUpdateUser}/>
          <DeleteCardPopup 
            isOpen={isDeletePopupOpen} 
            onClose={closeAllPopups} 
            onCardDelete = {handleCardDelete} 
            card={cardForDeletion}
          />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar = {handleUpdateAvatar}/>
        </LoadingProgressContext.Provider>

        <ImagePopup card = {selectedCard} isOpen = {!!selectedCard} onClose = {closeAllPopups}/>
        <InfoTooltip 
          isOpen = {isConfirmationPopupOpen} 
          onClose={closeAllPopups} 
          name="infoTooltip" 
          title={confirmationMessage}
          background={confirmationIcon} 
        />          
      </div>
    </CurrentUserContext.Provider>      
  );
}

export default App;
