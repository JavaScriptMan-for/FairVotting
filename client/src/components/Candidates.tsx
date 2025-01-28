import { FC, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCandidateId, setError } from "../../store/slices/reactSlice"

import RootState from '../types';
import { IPresident } from '../types';

import { useQuery } from '@tanstack/react-query';

const Candidates: FC = () => {
  const dispatch = useDispatch()
  const selectedCandidateId = useSelector((state: RootState) => state.reactRed.selectedCandidateId)

  const handleRadioChange = (candidateId: number) => {
    dispatch(setSelectedCandidateId(candidateId));
  };

   const fetchData = useCallback(async (): Promise<IPresident[]> => {
     try {
      const response = await fetch('/api/candidates');
      if (!response.ok) {
       throw new Error(`Ошибка сервера: ${response.status}`);
      }
      const data = await response.json();
      return data.candidates // Извлекаем массив кандидатов
    } catch (error) {
        console.error("Ошибка при получении кандидатов", error);
      throw new Error('Ошибка при загрузке кандидатов');
    }
  }, []);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['candidates'],
    queryFn: fetchData,
  });

useEffect(() => {
  if(isError) {
    dispatch(setError(String(error)))
  }  else {
    dispatch(setError(null))
  }
}, [isError, error, setError])
  return (
      
    <div id='vote'>
      {data && !isLoading ? data.map((candidate: IPresident) => (
        <label className='candidate' key={candidate.id}>
          <h1>{candidate.president}</h1>
          <h2>{candidate.party}</h2>
          <p>{candidate.description}</p>
          <input
            type="radio"
            name="candidate"
            value={candidate.id}
            checked={selectedCandidateId === candidate.id}
            onChange={() => handleRadioChange(candidate.id)}
          />
        </label>
      ))
    : 
    <p>Загрузка...</p>
    }
    </div>
  );
};

export default Candidates;