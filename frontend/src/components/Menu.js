import React from 'react';
//import { Link, useLocation, useHistory} from 'react-router-dom';

function Menu(props) {
  return(
    <ul className ={`header__info header__info_location_${props.location}`}>
      <li><p className="header__email">{props.email}</p></li>
      <li><button type="button" className="header__exit-buttton" onClick={props.signOut}>Выйти</button></li>
    </ul>
  )
}

export default Menu;