import { FC, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { regFn } from '../methods/regFn';

import { useDispatch } from 'react-redux';
import { getData, setIsRegOneStep } from '../../store/slices/authSlice';

import trueEye from "/img/trueEyes.png"
import falseEye from "/img/falseEyes.png"
import { useMutation } from '@tanstack/react-query';


const Register:FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailDirty, setEmailDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);

  const [emailValidationError, setEmailValidationError] = useState<string>('Поле не может быть пустым...');
  const [passwordValidationError, setPasswordValidationError] = useState<string>('Поле не может быть пустым...');

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const [showPassword, setShowPassword] = useState<string>('password')
  const [validateForm, setValidateForm] = useState<boolean>(false)

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


  const regMutation = useMutation({
    mutationFn: regFn,
    onSuccess: () => {
      dispatch(setIsRegOneStep(true))
      setEmail('');
      setPassword('')
      dispatch(getData({_email: email, _password: password}))
      navigate('/verify'); 
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
      regMutation.mutate({email, password})
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
       <h1 className='title'>Зарегистрироваться</h1>
        <label className='form-label' htmlFor="email">Email:</label>
        {(emailDirty && emailValidationError) && <p className='validation-error'>{emailValidationError}</p>}
        <input
        onBlur={blurHandler}
          type="email"
          id='email'
          name='email'
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateEmail(e)}
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
        <button disabled={!validateForm} type='submit'>Зарегистрироваться</button>
        <Link to="/auth">Есть аккаунт? Авторизуйтесь.</Link>
        {regMutation.isError && <p id='error'>{regMutation.error.message}</p>}
        {regMutation.isPending && <p className='input-error'>Подождите...</p>}
      </form>
    </div>
  )
}

export default Register;