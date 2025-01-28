import { FC, useEffect, useState } from 'react';

import account from "/img/account.png"
import { useSelector } from 'react-redux';
import RootState from '../types';

const User:FC = () => {
  const username = useSelector((state: RootState) => state.auth.username)
    const [user, setUser] = useState<string>('Пользователь')
    useEffect(()=> {
        if(!username) {
            return
        }
        user && setUser(username)
    }, [])
  return (
    <div id="user">
       <img src={account} alt="user" />
       <span>{ user }</span>
    </div> 
  )
}

export default User;