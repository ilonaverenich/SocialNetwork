import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Menu from '../users/Menu';
import axios from 'axios';
import {Button} from 'antd'


function Game() {
  const [state, setState] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
 
function getData(){
  setState(prev=>!prev)
  setShow(true)
}

  useEffect(() => {
    axios.get('https://dog.ceo/api/breeds/image/random').then((res) => setData(res.data.message));
  }, [state]);

/*   useEffect(() => {
    axios.get('https://www.boredapi.com/api/activity').then((res) => setText(res.data.activity));
  }, []); */

  return (
    <div className='personal-page'>
      <Header />
      <div className='container'>
        <Menu />
        <div className='body game-body'>
          <h2>Узнай, какая ты сегодня собачка!</h2>
          <Button onClick={()=>getData()}>Узнать</Button>
          <div className='game-body-img'>
            {show ? <img src={data} alt='Random Dog' />:''}
          </div>
        
    
        </div>
      </div>
    </div>
  );
}

export default Game;