import {useEffect, useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux';
import { setStatusAuth } from '../redux/mainReducer';
import { useNavigate } from 'react-router-dom';

function Header() {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch()
    const [data,setData] = useState([])
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        axios.post('http://localhost:1000/main',{token}).then(res=>setData(res.data));
    },[])

    useEffect(() => {
     axios.post('http://localhost:1000/main', { token }).then((res) => {
      setUserId(res.data._id)
      setEmail(res.data.email)
     })
    }, []);

 function exitPage(){
    axios.post('http://localhost:1000/exit',{userId}).then(res=>console.log(res.data)); 
    dispatch(setStatusAuth(false)) 
    navigate('/')
} 

  return (
    <div className='header'>
    <div> <img src="https://i.postimg.cc/PqSjkGHs/icons8-social-network-48.png" alt="logo" /></div>
    <div className='header-setting-menu'>
      <div><img src="https://i.postimg.cc/T2BKvg9h/icons8-person-30.png" alt= "" /></div>
      <div>{data && data.email}</div>
      <div className='exit' onClick={()=> exitPage()}>Выйти</div>
    </div>
  </div>
  )
}

export default Header