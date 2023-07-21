import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Menu from '../users/Menu';
import Header from '../Header';
import axios from 'axios';

function MessagesPage() {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(()=>{axios.post('http://localhost:1000/main', { token }).then((res) => setData(res.data))},1000)
      }, []);


  return (
    <div>{data.length === 0 ?(<div class="load">
    <hr/><hr/><hr/><hr/>
  </div>) :  <div className='personal-page'>      
        <Header />
        <div className='container'>
          <Menu />
          <div className='body'>
            У вас нет сообщений
          </div>
        </div>
      </div>}
      </div>
  )
}

export default MessagesPage