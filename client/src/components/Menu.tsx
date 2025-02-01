import { FC } from 'react';
import { useWindow } from '../hooks/useWindow.hook';
import User from './User';
import Logout from './Logout';
import Nav from './Nav';
import Exit from './Exit';
import "../css/client.scss"
import MobileNav from './MobileNav';

const Menu:FC = () => {
  const sizeWindow = useWindow();
  return (
    <menu>
    <User />
    <Logout />
    <Exit />
    {
      sizeWindow.width < 470
       ?
     <MobileNav />
       :
     <Nav />
    }
   
    </menu>
  )
}

export default Menu;