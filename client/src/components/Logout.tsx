import { FC } from 'react';
import out from "/img/out.png"
import { useDispatch } from 'react-redux';
import { setIsAuth, setJwt } from '../../store/slices/authSlice';
import Cookies from 'js-cookie';

const Logout:FC = () => {
  const dispatch = useDispatch()
    const functionLogout = () => {
      // localStorage.removeItem('jwt')
      // localStorage.removeItem('username')
      Cookies.remove('token')
      dispatch(setJwt(null))
      dispatch(setIsAuth(false))
        location.reload()
    }

  return (
    <>
       <button id='out' onClick={functionLogout}>
        <img src={out} alt="Выйти из аккаунта" />
        <span>Выйти из аккаунта</span>
       </button>
    </>
  )
}

export default Logout;