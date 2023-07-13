import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';


function  MainPage() {
    const navigate = useNavigate()
 
  return (
    <div className='content'>
        <h1>Главная страница</h1>
        <Button className='btn' onClick={()=>navigate('auth')}>Войти</Button>
        <Button className='btn' onClick={()=>navigate('register')}>Зарегистрироваться</Button>
    </div>
  )
}

export default MainPage