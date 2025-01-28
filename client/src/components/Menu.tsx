import { FC } from 'react';
import User from './User';
import Logout from './Logout';
import Nav from './Nav';
import "../css/client.scss"

const Menu:FC = () => {
  return (
    <menu>
    <User />
    <Logout />
    <Nav />
    </menu>
  )
}

export default Menu;