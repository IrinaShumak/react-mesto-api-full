import React from 'react';
import { useHistory } from 'react-router-dom';
import {authorize} from '../utils/auth';
import failure from '../images/popup-issue-icon.svg';

function Login (props) {
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
      authorize(password, email)
      .then((data) => {          
          if (data.token){
            localStorage.setItem('jwt', data.token);            
          }              
          props.handleLogin(true);          
          history.push("/");
          props.handleUserEmail(email);
          setEmail('');
          setPassword('')          
      })            
      .catch((err) => {
        console.log('Что-то пошло не так: ', err);
        props.handleShowConfirmation("Ошибка входа!Попробуйте ещё раз.", failure);
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
      <h3 className={'entry-form__title'}>Вход</h3>
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
        value={password || ''}
        placeholder='Пароль' 
        onChange={handlePasswordChange} 
        required 
        minLength="2"        
      />            
      <button type="submit" className={'entry-form__button'}>Войти</button>
    </form>
  )
}

export default Login;