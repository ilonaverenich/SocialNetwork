import {useEffect, useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux';
import { setStatusAuth } from '../redux/mainReducer';

function Header() {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch()
    const [data,setData] = useState([])
 
    useEffect(()=>{
        axios.post('http://localhost:1000/main',{token}).then(res=>setData(res.data));
    },[])

  return (
    <div className='header'>
    <div> <img src="https://i.postimg.cc/PqSjkGHs/icons8-social-network-48.png" alt="logo" /></div>
    <div className='header-setting-menu'>
      <div><img src="https://i.postimg.cc/T2BKvg9h/icons8-person-30.png" alt= "" /></div>
      <div>{data && data.email}</div>
      <div className='exit' onClick={()=>dispatch(setStatusAuth(false)) }>Выйти</div>
    </div>
  </div>
  )
}

export default Header