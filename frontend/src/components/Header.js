import React from 'react';
import Menu from './Menu';
import { Link, useLocation} from 'react-router-dom';

function Header(props) {
  const path = useLocation();
  

  return (    
    <header className="header">
      <div className="header__logo" />
      { (path.pathname === '/signup') ? (
          <Link to="/signin" className="header__link">Войти</Link>
        ) : (path.pathname === '/signin') ? (
          <Link to="/signup" className="header__link">Регистрация</Link> 
        ) : (
          <>
            <Menu email={props.email} signOut={props.signOut} location="inside"/>
            {(!props.isOpen) 
              ? (<button type="button" className="header__burger-menu-btn header__burger-menu-btn_type_open" onClick={props.onOpen}/>)
              : (<button type="button" className="header__burger-menu-btn header__burger-menu-btn_type_close" onClick={props.onClose} />
            )}
          </>
        )        
      }         
    </header>    
  );
}

export default Header;