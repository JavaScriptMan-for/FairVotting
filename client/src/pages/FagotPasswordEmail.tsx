import { useMutation } from '@tanstack/react-query';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Email, PutData } from '../types';
import { useDispatch } from 'react-redux';
import { setIsFagotStep } from '../../store/slices/authSlice';
const FagotPasswordEmail: FC = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [emailValidationError, setEmailValidationError] = useState<string>('Поле не может быть пустым...');
    const [emailDirty, setEmailDirty] = useState<boolean>(false);
    const [validateForm, setValidateForm] = useState<boolean>(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const dispatch = useDispatch();

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emailRegex.test(String(e.target.value).toLowerCase())) {
           setEmailValidationError('Некорректный email')
        } else {
         setEmailValidationError('')
        }
    }
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        switch(e.target.name) {
          case 'email': setEmailDirty(true); break;
        }
      }

    const mutation = useMutation({
        mutationFn: async (email:Email):Promise<PutData>  => {
            const response = await fetch('/api/send-mail', {
                method: "POST",
                body: JSON.stringify(email),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(!response.ok) throw new Error('Ошибка сервера')
            const data = await response.json();
            
            return data.email
        },
        onSuccess: () => {
            dispatch(setIsFagotStep(true))
            setIsSuccess(true)
            navigate('/verify-put')
        }
    })
    const Submit = (e:FormEvent) => {
        e.preventDefault();
        mutation.mutate({email})
    }
    useEffect(() => {
        setValidateForm(!!emailValidationError)
    }, [emailValidationError])
    return (
        <div style={{marginTop: `${30}vh`}} className='form'>
            <form onSubmit={(e:FormEvent) => Submit(e)}>
                <label htmlFor="email">Email:</label>
            {(emailDirty && emailValidationError) && <p className='validation-error'>{emailValidationError}</p>}
                <input
                onBlur={blurHandler}
                    id='email'
                    type="email"
                    placeholder='Введите email'
                    name='email'
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeEmail(e)}
                />
                <button disabled={validateForm} type='submit'>Отправить письмо</button>
                <Link to="#" onClick={() => navigate(-1)}>Назад</Link>
                {mutation.isPending && <p>Загрузка...</p>}
                {mutation.isError && <p id='error'>{mutation.error.message}</p>}
                {!mutation.isError && !mutation.isPending && isSuccess && <p id='succ'>Правильный код</p>}
            </form>
        </div>
    )
}

export default FagotPasswordEmail;