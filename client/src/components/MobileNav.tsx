import { FC, useMemo, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useWindow } from '../hooks/useWindow.hook';
import menu from "/img/menu.png";
import anim_menu from '/img/menu_animation.png';

const MobileNav: FC = () => {
    const windowSize = useWindow();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const getLinkStyle = useMemo(
        () => (path: string) => {
            return location.pathname === path ? { borderBottom: '2px solid purple' } : {};
        },
        [location.pathname]
    );


    const toggleDialog = (): void => {
         setIsOpen((prev => !prev))
    };

    const closeDialog = (): void => {
        setIsOpen(false);
    };

  useEffect(() => {
      if (windowSize.width > 470 && isOpen) {
          closeDialog();
      }
    }, [windowSize.width, isOpen]);

    return (
        <>
            <img id='menu_img' onClick={toggleDialog} src={isOpen ? menu : anim_menu} alt="menu-bar" />
            <dialog id='menu-bar' open={isOpen}>
                <div id="center">
                    <h1 className="title">Перейти по ссылке:</h1>
                    <NavLink style={getLinkStyle('/')} to="/">Голосование</NavLink> <br />
                    <NavLink style={getLinkStyle('/my_vote')} to="/my_vote">Мой голос</NavLink> <br />
                    <NavLink style={getLinkStyle('/count-votes')} to="/count-votes">Подсчёт голосов</NavLink> <br />
                    <a id='close' onClick={closeDialog}>
                        Закрыть
                    </a>
                </div>
            </dialog>
        </>
    );
};

export default MobileNav;