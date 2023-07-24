import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Menu from './Menu';
import Header from '../Header';
import axios from 'axios';
import { getMainUser } from '../../redux/mainReducer';


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
    console.log(user);
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
                <div key={user.id}>
                  {user.image ? (
                    <img
                      width='200px'
                      className='img'
                      height='200px'
                      src={`http://localhost:1000/${user.image}`}
                      alt='Изображение'
                      onClick={() => getPage(user)}
                    />
                  ) : (
                    <img
                      width='120px'
                      src='https://i.postimg.cc/x1FJjZnH/icons8-person-80.png'
                      alt='person'
                      onClick={() => getPage(user)}
                    />
                  )}
                  <div className='user'>
                    {user.name} {user.surname}
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