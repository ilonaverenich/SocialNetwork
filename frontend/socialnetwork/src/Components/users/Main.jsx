import axios from 'axios';
import {useState, useEffect} from 'react'


function Main() {
  const token = localStorage.getItem('token')
    const [data,setData] = useState()


  useEffect(()=>{
        axios.post('http://localhost:1000/main',{token}).then(res=>console.log(res))
    },[])

  return (
    <div>
        
        Вы успешно авторизовались!
        Ваш токен : {token}
    </div>
  )
}

export default Main