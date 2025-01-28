import { FC, useEffect, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Nav:FC = () => {
  const location = useLocation();

  const getLinkStyle = useMemo(() => (path: string) => {
    return location.pathname === path ? { borderBottom: '2px solid rgb(53, 185, 255)' } : {};
  }, [location.pathname]);

  useEffect(()=> {
    switch (location.pathname) {
      
  }
  }, [location])
  return (
    <nav>
        <NavLink style={getLinkStyle('/')} to="/">Голосование</NavLink>
        <NavLink style={getLinkStyle('/my_vote')} to="/my_vote">Мой голос</NavLink>
        <NavLink style={getLinkStyle('/count-votes')} to="/count-votes">Подсчёт голосов</NavLink>
    </nav>
  )
}

export default Nav;