import {useNavigate } from 'react-router-dom';
import {Button, Input, message} from 'antd';
import {useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import {getStatusAuth} from '../redux/mainReducer'


function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    email:'',
    password:''
  }) 
  const statusAuth = useSelector((store) => store.data.statusAuth);

  function sendData(){
    console.log(value)
    axios.post('http://localhost:1000/auth',value).then(res=>{
      localStorage.setItem('token', res.data.token);
      dispatch(getStatusAuth(true))
      console.log(statusAuth)
      navigate('/')
    }).catch(err=>message.error('Неверный логин или пароль!'))
  }
 
  return (
    <div className='content'>
        <h3>Войти в аккаунт</h3>
        <p>Введите email:</p>
        <Input className='input' type='email' onChange={(e)=>setValue({
          ...value, email: e.target.value
        })} />
        <p>Введите пароль:</p>
        <Input className='input' type='password' onChange={(e)=>setValue({
          ...value, password: e.target.value
        })}/>
        <div>
        <Button className='btn-login' onClick={()=>sendData()}>Войти</Button>
        <Button onClick={()=>navigate('/')}>На главную</Button>
        </div>
    </div>
  )
}

export default Auth