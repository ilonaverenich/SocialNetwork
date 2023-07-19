import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';
import  getStatusAuth  from '../redux/mainReducer';

function Header() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [data,setData] = useState([])
    useEffect(()=>{
        axios.post('http://localhost:1000/main',{token}).then(res=>setData(res.data));
    },[])

    function exit (){
       dispatch(getStatusAuth(false)) 
        navigate('/')
      }

  return (
    <div className='header'>
    <div> <img src="https://i.postimg.cc/PqSjkGHs/icons8-social-network-48.png" alt="logo" /></div>
    <div className='header-setting-menu'>
      <div><img src="https://i.postimg.cc/T2BKvg9h/icons8-person-30.png" alt= "" /></div>
      <div>{data.email}</div>
      <div className='exit' onClick={exit}>Выйти</div>
    </div>
  </div>
  )
}

export default Header