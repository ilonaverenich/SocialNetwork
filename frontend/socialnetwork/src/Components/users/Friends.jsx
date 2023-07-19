import {useEffect, useState} from 'react';
import Menu from './Menu';
import Header from '../Header';
import axios from 'axios';


function Friends() {
  const token = localStorage.getItem('token');
  const [email,setEmail] = useState('')
  const [data,setData] = useState([])
  useEffect(()=>{
    axios.post('http://localhost:1000/main',{token}).then(res=>setEmail(res.data.email));
    },[]) 

  useEffect(() => {
    axios.post('http://localhost:1000/friends',{email}).then(res=>setData(res.data))
  },[email])

  return (
     <div className='personal-page'>
    <Header/>
    <div className='container'>
       <Menu/> 
       <div className='body'>
     
      <div className='content-friends'>
       {data && data.map(user=><div>
        {user.image ? (
            <img width='200px' className='img' height='200px' src={`http://localhost:1000/${user.image}`} alt="Изображение" />
          ):<img width='120px'  src="https://i.postimg.cc/x1FJjZnH/icons8-person-80.png" alt="person" />}
          <div className = 'user'>{user.name} {user.surname}</div>
       </div>)}

       </div>
   
       </div>
      
       
    </div>
     
  </div>
  )
}

export default Friends