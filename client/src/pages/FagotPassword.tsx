import { FC, FormEvent, useState, useEffect } from 'react';
import { fagotPassword } from '../methods/fagotFn';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootState from '../types';

import trueEye from "/img/trueEyes.png"
import falseEye from "/img/falseEyes.png"

const FagotPassword:FC = () => {
    const fagot_step = useSelector((state: RootState) => state.auth.isFagotStep);
    const navigate = useNavigate();

  useEffect(()=> {
    if(!fagot_step) {
      navigate('/auth')
    }
  }, [fagot_step, navigate])
  const [verify_password_code, setVerify_Password_Code] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<string>('password')
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const [newPasswordDirty, setNewPasswordDirty] = useState<boolean>(false)
  const [verifyDirty, setVerifyDirty] = useState<boolean>(false)
  const [passwordValidationError, setPasswordValidationError] = useState<string>('Поле не может быть пустым...');
  const [verifyErrors, setVerifyErrors] = useState<string>('Поле не может быть пустым...')
  const [validForm, setValidForm] = useState<boolean>(false);
  
  useEffect(()=> {
    if(passwordValidationError || verifyErrors) {
        setValidForm(false)
    } else {
        setValidForm(true)
    }
  }, [passwordValidationError, verifyErrors])
    const submitForm = (e:FormEvent):void => {
        e.preventDefault();
        mutationFagot.mutate({ newPassword, verify_password_code });
    }
    const onChangeVerifyCode = (e: React.ChangeEvent<HTMLInputElement>):void => {

        if(e.target.value.length !== 7) {
            setVerify_Password_Code(e.target.value);
          } 
          if(e.target.value.length > 6) e.target.value.slice(0, 6)

          if(e.target.value.length < 6) {
            setVerifyErrors('Код состоит из 6 символов')
          } else {
            setVerifyErrors('')
          }
    }
    const onChangeNewPassword = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setNewPassword(e.target.value);
        if(e.target.value.length < 6 || e.target.value.length > 20) {
            setPasswordValidationError('Пароль должен содержать от 6 до 20 символов')
            if(!e.target.value) {
              setPasswordValidationError('Поле не может быть пустым...')
            } 
          } else {
            setPasswordValidationError('')
          }
    }
    const showPass = ():void => {
        if(showPassword == 'text') {
          setShowPassword('password')
        } else if(showPassword == 'password') {
          setShowPassword('text')
        }
      }
      const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        switch(e.target.name) {
          case 'verify_password_code': setVerifyDirty(true); break;
          case 'newPassword': setNewPasswordDirty(true); break;
        }
      }
    const mutationFagot = useMutation({
        mutationFn: fagotPassword,
        onSuccess: () => {
            setIsSuccess(false);
            navigate('/auth')
        },
        onError: () => {
            setIsSuccess(false)
        }
    }) 
  return (
    <div style={{marginTop: `${30}vh`}} className='form'>
    <form onSubmit={(e: FormEvent) => submitForm(e)}>
        <h1>Забыли пароль:</h1>
    <label className='form-label' htmlFor='verify_code'>Код:</label>
    {(verifyDirty && verifyErrors) && <p className='validation-error'>{verifyErrors}</p>}
       <input
       onBlur={blurHandler}
        required
        id='verify_code'
        type="number"
        placeholder='Введите код'
        name='verify_password_code'
        value={verify_password_code}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeVerifyCode(e)}
         />
        <label style={{marginLeft: `${-100}px`}} className='form-label' htmlFor="new-password">Новый пароль:</label> 
        {(newPasswordDirty && passwordValidationError) && <p className='validation-error'>{passwordValidationError}</p>}
        <div className="input-container">
        {newPassword.length !== 0 && <img onClick={()=> showPass()} id='eye' src={showPassword == 'password' ? falseEye : trueEye} alt="eye" />}
        <input
          required
          type={showPassword}
          id='password'
          name='newPassword'
          value={newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeNewPassword(e)}
          onBlur={blurHandler}
          placeholder='Введите пароль...'
        />
         </div> 
          <button disabled={!validForm} type='submit'>Изменить пароль</button>
          {mutationFagot.isPending && !mutationFagot.isError && <p>Загрузка...</p>}
          {mutationFagot.isError && !mutationFagot.isPending && <p id='error'>{mutationFagot.error.message}</p>}
          {!mutationFagot.isError && !mutationFagot.isError && isSuccess && <p>Вы успешно изменили пароль</p>}
    </form>
    </div>
  )
}

export default FagotPassword;