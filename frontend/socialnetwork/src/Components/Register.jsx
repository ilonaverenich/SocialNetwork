import {useNavigate} from 'react-router-dom';
import {Button, Input,message} from 'antd';
import {useState} from 'react';
import axios from 'axios'


function Register() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    id: (new Date).getTime() 
  });

  const [password, setPassword] = useState('');
  const [state, setState] = useState({
    stateName: false,
    stateSurname: false,
    stateEmail: false,
    statePassword1: false,
    statePassword2: false,
  });

  async function registerHandler() {
    if (register.name.trim() === '') {
      setState({ ...state, stateName: true });
      return;
    }
    if (register.surname.trim() === '') {
      setState({ ...state, stateSurname: true });
      return;
    }
    if (register.email.trim() === '') {
      setState({ ...state, stateEmail: true });
      return;
    }
    if (register.password.trim() === '') {
      setState({ ...state, statePassword1: true });
      return;
    }
    if (register.password !== password) {
      setState({ ...state, statePassword2: true });
      message.error('пароли не совпадают!')
      return;
    }
    
    console.log(register);
    await axios.post('http://localhost:1000/register',register).then(el=>localStorage.setItem('token', el.data.token)).catch(err=>console.log(err))
    message.success('Вы успешно зарегистрировались!');
    navigate('/auth'); 
  }

  return (
    <div className='content'>
      <h3>Регистрация нового пользователя:</h3>
      <p>Введите имя:</p>
      <Input className={state.stateName ? 'input error-data' : 'input'} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
      <p>Введите фамилию:</p>
      <Input className={state.stateSurname ? 'input error-data' : 'input'} onChange={(e) => setRegister({ ...register, surname: e.target.value })} />
      <p>Введите email:</p>
      <Input className={state.stateEmail ? 'input error-data' : 'input'} onChange={(e) => setRegister({ ...register, email: e.target.value })} />
      <p>Введите пароль:</p>
      <Input type='password' className={state.statePassword1 ? 'input error-data' : 'input'} onChange={(e) => setRegister({ ...register, password: e.target.value })} />
      <p>Введите повторно пароль:</p>
      <Input type='password' className={state.statePassword2 ? 'input error-data' : 'input'} onChange={(e) => setPassword(e.target.value)} />
      <div>
        <Button className='btn-register' onClick={registerHandler}>Зарегистрироваться</Button>
        <Button onClick={() => navigate('/')}>На главную</Button>
      </div>
    </div>
  );
}

export default Register;