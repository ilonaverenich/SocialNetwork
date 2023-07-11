import {useNavigate} from 'react-router-dom';
import {Button, Input} from 'antd';
import {useState} from 'react';
import axios from 'axios'

function Auth() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  console.log(token)
  const [datas,setDatas] = useState([])
  function sendData( ){
    axios.post('http://localhost:1000/auth',{token}).then(res=>localStorage.setItem('id',res.data.itemId))

  }
  console.log(datas)
  return (
    <div className='content'>
    <h3>Войти в аккаунт</h3>
    <p>Введите email:</p>
    <Input className='input' type='email'></Input>
    <p>Введите пароль:</p>
    <Input className='input' type='password'></Input>
    <div>
    <Button className='btn-login' onClick={()=>sendData()}>Войти</Button>
    <Button onClick={()=>navigate('/')}>На главную</Button>
    </div>
    </div>
  )
}

export default Auth