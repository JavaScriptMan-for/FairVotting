import "../css/client.scss"
import { FC, useCallback } from 'react';
import { useEffect, useState } from "react";
import { VotePercentages, IPresident } from "../types";
import { useQuery } from "@tanstack/react-query";

import Menu from "../components/Menu";
const CountVote:FC = () => {
    const [candidates, setCandidates] = useState<IPresident[] | null>(null);
    const fetchData = useCallback(async (): Promise<IPresident[]> => {
        try {
            const response = await fetch('/api/candidates');
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            const data = await response.json();
            return data.candidates; // Извлекаем массив кандидатов
        } catch (error) {
            console.error('Ошибка при получении кандидатов', error);
            throw new Error('Ошибка при загрузке кандидатов');
        }
}, []);
useEffect(() => {
    const loadData = async () => {
      try {
          const result = await fetchData();
        await setCandidates(result);

      } catch(error: any) {
          console.error("Ошибка в useEffect:", error);
       }
    }
    loadData();

}, [fetchData]);

const fetchVotes = async ():Promise<VotePercentages> => {
    try {
        const response = await fetch('/api/count-vote')
    if(!response.ok) {
        throw new Error(`Ошибка сервера ${response.status}`)
    }
    const data = await response.json();
   return data
    } catch (error) {
        console.error("Ошибка при получении кандидатов", error);
        throw new Error('Ошибка при загрузке подсчётов голосов');
    }
   
}
const {data, isLoading, isError, error} = useQuery({
    queryKey: ['percentageResults'],
    queryFn: fetchVotes
})
  return (
    <>
        <Menu />
        <div id="count-candidates">
            <h1 style={{marginBottom: `${20}px`}}>Подсчёт голосов:</h1>
        {data &&
                candidates &&
                    !isLoading && 
                    !isError &&
                Object.entries(data.percentageResults).map(
                    ([candidateId, percentage]) => {
                        const candidate = candidates.find(
                            (cand) => cand.id === Number(candidateId)
                        );
                        return (
                            <table className="count_candidates" key={candidateId}>
                                 <tr><td><p>{candidate?.president || `Неизвестный кандидат`}:{' '}</p></td><td><p>{percentage}%</p></td></tr>  
                            </table>
                        );
                    }
                )}
                {isLoading && <p>Загрузка...</p>}
                {error && <p>{error.message}</p>}
        </div>
    </>
  )
}

export default CountVote;