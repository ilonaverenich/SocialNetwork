import axios from 'axios';
import {useState, useEffect} from 'react';
import {Button, Input} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getStatusAuth,getUser, getStatus} from '../../redux/mainReducer'


function Main() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [data,setData] = useState([])
  const [status,setStatus] = useState(false);
  const [statusData,setStatusData] = useState('');
  const statusUser = useSelector((store) => store.data.user.status);

  useEffect(()=>{
    axios.post('http://localhost:1000/main',{token}).then(res=>setData(res.data));
  
    },[])
  function exit (){
    dispatch(getStatusAuth(false))
    navigate('/')
  }
  function setStatusHandler(){
     setStatus(true)
  }
  function saveHandler(){

    setStatus(false)
    dispatch(getStatus(statusData))
  }
  return (
    <div className='personal-page'>
      <div className='header'>
        <div> <img src="https://i.postimg.cc/PqSjkGHs/icons8-social-network-48.png" alt="logo" /></div>
        <div className='header-setting-menu'>
          <div><img src="https://i.postimg.cc/T2BKvg9h/icons8-person-30.png" alt="" /></div>
          <div>{data.email}</div>
          <div className='exit' onClick={()=>exit()}>Выйти</div>
        </div>
      </div>

      <div className='container'>
            <div className='menu'>
                <div className='menu-link'>
                <div >Моя страница</div>
                <div>Друзья</div>
                <div>Сообщения</div>
                </div>
            </div>       
          <div className='body'>
            <div className='body-content'>
            <div className='body-img'>
              <img width='120px' src="https://i.postimg.cc/x1FJjZnH/icons8-person-80.png" alt="" />
            </div>
            <div className='body-name'>
             <div className='name-person'> {data.name}  { data.surname} </div>
             {!status ?
             <div className='status' onClick={()=>setStatusHandler()}>{statusUser.length == 0 ?'установите статус': statusUser}</div>: <Input onChange={(e)=>setStatusData(e.target.value)} value={statusData} className='input' onBlur={()=>saveHandler()}/>}</div>
           

            </div>
            <div className='edit-content'>
              <div className='bold'>Контактная информация</div>
              <div>edit</div>
            </div>
           
            <hr/>
            <div ><span className='bold'>Дата рождения:</span> 05.05.1995</div>
            <div> <span className='bold'>Семейное положение:</span> Не замужем</div>
            <div><span className='bold'>Место работы: </span>ИП</div>
            <div><span className='bold'>Интересы, хобби:</span> Математика, программирование</div>
            <hr/>
            <div > <span className='bold'>Любимые фильмы:</span> Всегда говори -да!</div>
            <div></div>
            <hr/>
            <div className='bold'>Любимые цитаты: </div>
            <hr/>

          </div>       
      </div>
      <div className='footer'>2023, Ilona Verenich</div>
        
        
      


    </div>
  )
}

export default Main