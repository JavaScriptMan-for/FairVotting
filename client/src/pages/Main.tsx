import '../css/client.scss';
import { FC, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData, getUsername, setIsAuth } from '../../store/slices/authSlice';
import { setVoteId, setError, setYourVoteId } from '../../store/slices/reactSlice';
import { SecretData } from '../types';
import { IVote } from "../types";

import Candidates from '../components/Candidates';
import Menu from '../components/Menu';

import RootState, { VotePercentages } from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const Main: FC = () => {
  const dispatch = useDispatch()
  const errorRef = useRef<HTMLParagraphElement>(null);
  const succRef = useRef<HTMLParagraphElement>(null)

  const [success, setSuccess] = useState<boolean>(false);

  const selectedCandidateId = useSelector((state: RootState) => state.reactRed.selectedCandidateId)
  const username = useSelector((state: RootState) => state.auth.username)

  const secret = useQuery({
    queryKey: ['get-username'],
    queryFn: async ():Promise<SecretData> => {
        const response = await fetch('/api/users/get-username');
        if(!Cookies.get('username')) throw new Error('Проблема с файлами cookie')
        if(!response.ok) throw new Error('Ошибка при получении данных');
        const data_ = await response.json()
        return await data_
    }
})

const voteFn = async (dataVote: IVote): Promise<VotePercentages> => {
  if(!secret) throw new Error('Тайная ошибка');

  if(!secret.isLoading && secret.data?.user_email !== Cookies.get('username')) throw new Error('Кто-то пытается обмануть систему')

      const response: Response = await fetch('/api/vote', {
        method: "POST",
        body: JSON.stringify(dataVote),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Ошибка при отдаче голоса');
      }
      return response.json()

}
  useEffect(() => {
    dispatch(getData({ _email: "", _password: "" }))
    username === null && dispatch(getUsername(Cookies.get('username')))
    username === undefined && dispatch(setIsAuth(false))
  }, [])
  const mutationVote = useMutation({
    mutationFn: voteFn,
    onSuccess: () => {
      setSuccess(true)
      succRef && succRef.current && succRef.current?.scrollIntoView({ behavior: 'smooth' });
      dispatch(setYourVoteId(selectedCandidateId))
      Cookies.set('success', 'true')
    },
    onError: () => {
      setSuccess(false)
      Cookies.set('success', 'false')
    }
  })
  const handleVoteClick = async (): Promise<VotePercentages | undefined> => {
    if (!selectedCandidateId) {
      console.error("Ни один кандидат не выбран");
      return;
    }
    if (!username) throw new Error('Пользователь не найден');
    mutationVote.mutate({ candidateId: selectedCandidateId, username: username });

    if (mutationVote.isError) {
      dispatch(setError(mutationVote.error.message))
      setSuccess(false);
      if (errorRef.current) {
        errorRef.current.scrollIntoView({ behavior: "smooth" })
      }
      throw new Error(`Серверная ошибка ${mutationVote.status}`);
    }
    dispatch(setError(null))
    const data: VotePercentages | undefined = mutationVote.data
    succRef.current && succRef.current.scrollIntoView({ behavior: "smooth" })
     dispatch(setVoteId(selectedCandidateId))
    console.log('Вы проголосовали за кандидата с ID:', selectedCandidateId);
    return data
  }
  useEffect(() => {
    if (mutationVote.isError) {
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mutationVote.isError]);
  useEffect(() => {
    if (success) {
      succRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [success]);
  return (
    <>
      <Menu />

      <Candidates />

      <button disabled={!selectedCandidateId || !username || username.length < 6 || mutationVote.isPending || !Boolean(Cookies.get('success'))} onClick={() => handleVoteClick()}>Проголосовать</button>
      {mutationVote.isError && <p ref={errorRef} id='error'>{mutationVote.error.message}</p>}
      {success && <p ref={succRef} id='succ'>Вы успешно проголосовали!</p>}
    </>
  );
};

export default Main;