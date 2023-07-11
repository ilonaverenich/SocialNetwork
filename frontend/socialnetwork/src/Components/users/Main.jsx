import axios from 'axios';
import {useState, useEffect} from 'react'


function Main() {
    const [data,setData] = useState()
    const id = localStorage.getItem('id')

/*     useEffect(()=>{
        axios.post('http://localhost:1000/users',id).then(res=>console.log(res))
      },[]) */

  return (
    <div>
        
        Вы успешно авторизовались!
        Ваш токен : 
    </div>
  )
}

export default Main