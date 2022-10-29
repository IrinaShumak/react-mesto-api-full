import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {register} from '../utils/auth';
import success from '../images/popup-confirmation-icon.svg';
import failure from '../images/popup-issue-icon.svg';

function Register (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);    
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);    
  }

  function handleSubmit(e){
    e.preventDefault()
    if (email && password){      
      register(password, email)
        .then((res) => {          
          props.handleShowConfirmation("Вы успешно зарегистрировались!", success);
          history.push("/signin")           
        })            
        .catch((err) => {
          console.log('Что-то пошло не так: ', err);
          props.handleShowConfirmation("Что-то пошло не так!Попробуйте ещё раз.", failure);          
        })        
    }
  }  
  
  return (
    <form 
      className={'entry-form'} 
      action="#" 
      method="post" 
      name={props.name} 
      onSubmit= {handleSubmit}        
    >        
      <h3 className={'entry-form__title'}>Регистрация</h3>
      <input 
        id="email-input" 
        type="text" 
        className="entry-form__input" 
        name="email"
        placeholder='Email' 
        value={email || ''} 
        onChange={handleEmailChange} 
        required 
        minLength="2"        
      />   
      <input 
        id="password-input" 
        type="password" 
        className="entry-form__input" 
        name="password" 
        placeholder='Пароль'
        value={password || ''} 
        onChange={handlePasswordChange} 
        required 
        minLength="2"        
      />            
      <button type="submit" className={'entry-form__button'}>Зарегистрироваться</button>                
      <Link to="/signin" className="entry-form__login-link">Уже зарегистрированы? Войти</Link>
        
    </form>
  )
}

export default Register;