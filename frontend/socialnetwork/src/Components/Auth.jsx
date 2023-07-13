import {useNavigate } from 'react-router-dom';
import {Button, Input} from 'antd';
import {useState} from 'react';
import axios from 'axios'

function Auth() {
  const navigate = useNavigate()


  const [datas,setDatas] = useState([])

  const [value, setValue] = useState({
    email:'',
    password:''
  })
  
  function sendData(){
    console.log(value)
    axios.post('http://localhost:1000/auth',value).then(res=>{
      localStorage.setItem('token', res.data.token);
      navigate('/main')
    })
  }
  console.log(datas)
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