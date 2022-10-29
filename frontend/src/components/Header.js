import React from 'react';
import Menu from './Menu';
import { Link, useLocation} from 'react-router-dom';

function Header(props) {
  const path = useLocation();
  

  return (    
    <header className="header">
      <div className="header__logo" />
      { (path.pathname === '/sign-up') ? (
          <Link to="/sign-in" className="header__link">Войти</Link>
        ) : (path.pathname === '/sign-in') ? (
          <Link to="/sign-up" className="header__link">Регистрация</Link> 
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