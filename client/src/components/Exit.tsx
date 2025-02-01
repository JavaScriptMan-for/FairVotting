import { FC, useState } from 'react';
import delete_ from "/img/delete.png"
import {deleteAccount} from "../methods/deleteAccountFn"
import { useMutation } from '@tanstack/react-query';
import { setIsAuth } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
const Exit:FC = () => {
    const [success, setSuccess] = useState<boolean>(false)
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn: deleteAccount,
        onSuccess: async () => {
            setSuccess(true)
            Cookies.remove('username');
            Cookies.remove('token');
            dispatch(setIsAuth(false));
            window.location.reload()
        }
    })
    const delete_acc = () => {
        mutation.mutate();
    }
  return (
    <>
     <button onClick={delete_acc} id='exit'>
        <img src={delete_} alt="delete" />
        <span>Удалить аккаунт</span>
     </button>
     {mutation.isPending && <p>Загрузка...</p>}
     {mutation.isError && <p id='error'>{mutation.error.message}</p>}
    {!mutation.isPending && !mutation.isError && success && <p id='succ'>Аккаунт успешно удалён</p>}
    </>
  )
}

export default Exit;