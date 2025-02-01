import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../types';
import Menu from '../components/Menu';

const My_vote:FC = () => {
  const vote_id = useSelector((state: RootState) => state.reactRed.your_vote_id)

  const [your_vote, setYour_vote] = useState<string>('');

 vote_id && localStorage.setItem('n', String(vote_id))
 
  useEffect(()=> {
    switch(Number(localStorage.getItem('n'))) {
      case 1: setYour_vote("Владимир Владимирович Путин"); break;
      case 2: setYour_vote("Владимир Вольфович Жириновский"); break;
      case 3: setYour_vote("Алексей Анатольевич Навальный"); break;
      case 4: setYour_vote("Геннадий Андреевич Зюганов"); break;
      case 5: setYour_vote("Григорий Алексеевич Явлинский"); break;
      case 6: setYour_vote("Сергей Михайлович Миронов"); break;
      case 7: setYour_vote("Борис Борисович Надеждин"); break;
      case 8: setYour_vote("Владислав Андреевич Даванков"); break;
      default: setYour_vote("Вы не проголосовали");
    }
  }, [])

  return (
    <article>
      <Menu />
    <div id='my_vote'>
    <h1>Ваш голос:</h1>
    {
    !!localStorage.getItem('n') ? <p id='vote-paragraph'>{your_vote}</p> : <p>Вы ещё не проголосовали</p>
     }

    </div> 
    </article>
  )
}

export default My_vote;