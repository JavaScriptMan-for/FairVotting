import { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJwt, getUsername } from '../../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

import RootState from "../types"

import trueEye from "/img/trueEyes.png"
import falseEye from "/img/falseEyes.png"

import { useMutation } from '@tanstack/react-query';
import { authFn } from '../methods/authFn';

const Auth: FC = () => {
  const {_email, _password} = useSelector((state: RootState) => state.auth.data)
  const step = useSelector((state: RootState) => state.auth.isRegOneStep);
  const [isStep, setIsStep] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailDirty, setEmailDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);

  const [emailValidationError, setEmailValidationError] = useState<string>('Поле не может быть пустым...');
  const [passwordValidationError, setPasswordValidationError] = useState<string>('Поле не может быть пустым...');

  const [email, setEmail] = useState<string>(_email);
  const [password, setPassword] = useState<string>(_password);
  const [showPassword, setShowPassword] = useState<string>('password');
  const [validateForm, setValidateForm] = useState<boolean>(false)



  useEffect(()=> {
    step ? setIsStep(true) : setIsStep(false)
  }, [step])

  const validateEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
     if(!emailRegex.test(String(e.target.value).toLowerCase())) {
        setEmailValidationError('Некорректный email')
     } else {
      setEmailValidationError('')
     }
  }
  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if(e.target.value.length < 6 || e.target.value.length > 20) {
      setPasswordValidationError('Пароль должен содержать от 6 до 20 символов')
      if(!e.target.value) {
        setPasswordValidationError('Поле не может быть пустым...')
      } 
    } else {
      setPasswordValidationError('')
    }
  }

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch(e.target.name) {
      case 'email': setEmailDirty(true); break;
      case 'password': setPasswordDirty(true); break;

    }
  }

  const authMutation = useMutation({
    mutationFn: authFn,
    onSuccess: (data) => {
      setEmail('');
      setPassword('');
      if(data && data.token && data.email) {

        dispatch(setJwt(data.token))
        dispatch(getUsername(data.email))
        navigate('/')
      }
    }
  })
  const showPass = ():void => {
    
    if(showPassword == 'text') {
      setShowPassword('password')
    } else if(showPassword == 'password') {
      setShowPassword('text')
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(email || password) {
      authMutation.mutate({email, password})
    }
    
  }

  useEffect(()=> {
    if(emailValidationError || passwordValidationError) {
      setValidateForm(false);

    } else {
      setValidateForm(true)

    }
  }, [emailValidationError, passwordValidationError])

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
      <h1 className='title'>Войти</h1>
        <label className='form-label' htmlFor="email">Email:</label>
        {(emailDirty && emailValidationError) && <p className='validation-error'>{emailValidationError}</p>}
        <input
          type="email"
          id='email'
          name='email'
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateEmail(e)}
          onBlur={blurHandler}
          placeholder='Введите email...'
        />
         <label className='form-label' htmlFor="password">Пароль:</label>
       {(passwordDirty && passwordValidationError) && <p className='validation-error'>{passwordValidationError}</p>}
         <div className="input-container">
        {password.length !== 0 && <img onClick={()=> showPass()} id='eye' src={showPassword == 'password' ? falseEye : trueEye} alt="eye" />}
        <input
          type={showPassword}
          id='password'
          name='password'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => validatePassword(e)}
          onBlur={blurHandler}
          placeholder='Введите пароль...'
        />
         </div> 
         {isStep ?
          <button type='submit'>Войти</button>
                 :
          <button disabled={!validateForm && !isStep} type='submit'>Войти</button>
        }
        <Link to="/register">Нет аккаунта? Зарегистрируйтесь.</Link>
        {authMutation.isError && <p className='input-error' id='error'>{authMutation.error.message}</p>}
      </form>
    </div>
  )
}

export default Auth;