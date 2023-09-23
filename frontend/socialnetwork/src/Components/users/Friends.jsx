import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { getMainUser } from '../../redux/mainReducer';
import Menu from './Menu';
import Header from '../Header';
import axios from 'axios';


function Friends() {
  const token = localStorage.getItem('token');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(()=>{axios.post('http://localhost:1000/main', { token }).then((res) => setEmail(res.data.email))},500)
  }, []);
 
  useEffect(() => {
    if (email) {
      axios.post('http://localhost:1000/friends', { email }).then((res) => {
        setData(res.data);
      });
    }
  }, [email]); 
  

  function getPage(user) {
    dispatch(getMainUser(user));
    navigate('/user');
  }

  return (
    <div>{data && data.length === 0 ?(<div class="load">
    <hr/><hr/><hr/><hr/>
  </div>) :  <div className='personal-page'>      
        <Header />
        <div className='container'>
          <Menu />
          <div className='body'>
            <div className='content-friends'>
              {data.map((user) => (
                <div key={user.id} className='content-friends-item'>
                  {user.image ? (
                   <div>
                    <img
                      width='200px'
                      className='img'
                      height='200px'
                      src={`http://localhost:1000/${user.image}`}
                      alt='Изображение'
                      onClick={() => getPage(user)}
                    /> </div>
                  ) : (
                    <img
                      width='200px'
                      className='img'
                      src='https://i.postimg.cc/x1FJjZnH/icons8-person-80.png'
                      alt='person'
                      onClick={() => getPage(user)}
                    />
                  )}
                  <div className='user'>
                    
                    <div className='name-person'>{user.name} {user.surname} {user.active?<span className='active-status online'></span>:<span className=' active-status offline'></span>}</div>
               
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>}
      </div>
  );
}

export default Friends;