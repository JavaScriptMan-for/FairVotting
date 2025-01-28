import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import RootState from "../types"
import { useSpam } from "./useSpam.hook"
import { setIsAuth, setJwt } from "../../store/slices/authSlice"
import Cookies from "js-cookie"

import Main from "../pages/Main"
import Auth from "../pages/Auth"
import Register from "../pages/Register"
import My_vote from "../pages/My_vote"
import CountVote from "../pages/CountVotes"
import Verify from "../pages/Verify"




export const useRoutes = () => {
    const {spamLocalstorage, spamCookies} = useSpam()
    const jwt = useSelector((state: RootState) => state.auth.jwt)
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    let isAuth: boolean = useSelector((state:RootState) => state.auth.isAuth);
    useEffect(() => {
        spamLocalstorage();
        spamCookies()

        !Cookies.get('token') && dispatch(setIsAuth(false))
        jwt === null && dispatch(setJwt(Cookies.get('token')));
        jwt === undefined && dispatch(setIsAuth(false))
              
        isAuth = !!jwt

        if (isAuth && location.pathname !== '/' && location.pathname !== '/my_vote' && location.pathname !== '/count-votes') {
            navigate('/');
        }
        if (!isAuth && location.pathname !== '/auth' && location.pathname !== '/register' && location.pathname !== '/verify') {
            navigate('/auth');
        }
 
        switch(location.pathname) {
            case '/': document.title = "Голосование"; break;
            case '/my_vote': document.title = "Мой голос"; break;
            case "/auth": document.title = "Авторизация"; break;
            case "/register": document.title = "Регистрация"; break;
            case "/count-votes": document.title = "Подсчёт голосов"; break;
            default: "Голосование"
        }
    }, [location, navigate]);

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/my_vote" element={<My_vote />} />
            <Route path="/count-votes" element={<CountVote />}/>
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />}/>
        </Routes>
    );
}

