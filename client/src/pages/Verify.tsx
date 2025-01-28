import { FC, FormEvent, useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {useNavigate } from "react-router-dom"
import { mutateCode } from './../methods/mutateCode';
import { useSelector } from 'react-redux';
import RootState from '../types';


const Verify:FC = () => {
  const navigate = useNavigate()
  const step = useSelector((state: RootState) => state.auth.isRegOneStep);

  useEffect(()=> {
    if(!step) {
      navigate('/auth')
    }
  }, [step, navigate])

    const [value, setValue] = useState<string>('')
    const [validateForm, setValidateForm] = useState<boolean>(false)

    const mutationCode = useMutation({
        mutationFn: mutateCode,
        onSuccess: () => navigate('/auth')
    })

    
    const sendCode = (e: FormEvent) => {
        e.preventDefault();
        if(!value) throw new Error('Ошибка! Попробуйте перезайти в аккаунт');
        mutationCode.mutate({codeClient: value})
    }

  return (
    <div style={{marginTop: `${30}vh`}} className='form'>
       <form onSubmit={(e:FormEvent)=> sendCode(e)}>
       <h1 className='title'>Подтверждение</h1>
        <input
        required
         type="number"
         placeholder='Код...'
         value={value}
         onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
          if(e.target.value.length !== 7) {
            setValue(e.target.value);
          } 
          if(e.target.value.length > 6) e.target.value.slice(0, 6)

          if(e.target.value.length < 6) {
            setValidateForm(false)
          } else {
            setValidateForm(true)
          }
        }}
          />
          <button disabled={!validateForm}>Отправить</button>
           {mutationCode.isError && <p className='input-error' id='error'>{mutationCode.error.message}</p>}
           {mutationCode.isPending && <p>Подождите немного...</p>}
       </form>
     
    </div>
  )
}

export default Verify;