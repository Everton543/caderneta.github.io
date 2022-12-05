import React from "react";
import './colors.css';
import './menu.css';
import MenuItem from './menuItem';

import logo from "../images/logo.jpg";

function Menu() {
  const homeLink = '/';
  const productsLink = "/#/produtos";
  const contatoLink = "/#/contato";

  return (
    <div className='menuContainer'>
      <img src={logo} alt="Logo" className="menuLogo"/>
      <label htmlFor="checkbox" className="bars"> <i className="glyphicon glyphicon-menu-hamburger "></i>
        <span></span>
      </label>
      <input type="checkbox" id="checkbox" className="checkbox"/>
      <div className='menuItemsContainer' id="menuItemsContainer">
        <MenuItem link={homeLink} title={'Página Inicial'} />
        <MenuItem link={productsLink} title={'Produtos'} />
        <MenuItem link={contatoLink} title={"Contato"} />
      </div>
    </div>
  );
}

export default Menu;