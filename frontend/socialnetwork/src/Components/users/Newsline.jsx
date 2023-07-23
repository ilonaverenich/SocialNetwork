import {useEffect, useState} from 'react';
import {Input, Button} from 'antd'
import axios from 'axios';

function Newsline() {
  const token = localStorage.getItem('token');
  const [data,setData] = useState([])
  const [values, setValues] = useState('')
  const [list, setList] = useState({
    id:(new Date()).getTime(),
    likes:'',
    comment:''
  })

  const [state, setState] = useState(false)
  const [count, setCount] = useState(null)
  
   useEffect(()=>{
    setList({...list, id: (new Date()).getTime()})
    },[state]) 
  function addList() {
    setState((prev)=>!prev)
    setList({...list, likes: 0})
    setList({...list, comment: values})

    console.log(list)
    setValues('')
   /*  axios.post('http://localhost:1000/main',).then(result=>console.log(result)) */
  
  }
 

  useEffect(()=>{
    axios.post('http://localhost:1000/main',{token}).then(res=>setData(res.data));
    },[]) 

  return (
    <div className='block'>
      <div className='bold'>Моя лента</div>
        <hr></hr>
      <div className='container-newsline'>
      <img width='50px' className='img' height='50px' src={`http://localhost:1000/${data.image}`} alt="Изображение" />
      <Input className='input-newsline' value={values} onChange={e=>setValues(e.target.value)} placeholder='Написать на стенке'></Input>
   
      <Button className='btn-newsline' onClick={()=>addList()}>Отправить</Button>
      </div>
      <div className='content-newsline'>
{/*       {list && list.map(comment=><div className='block-newsline'>
          <div className='box-newsline'>
                <div className='icon-newsline'><img width='35px' className='img' height='35px' src={`http://localhost:1000/${data.image}`} alt="Изображение" /></div>
                <div className='comment-newsline'>{comment}</div>
          </div> 

    <div className='content-newsline-icons'>
        <div className=''><img src="https://i.postimg.cc/c4jxWM0N/icons8-delete-24.png"></img></div>
        <div className=''><img src="https://i.postimg.cc/PrQMYBwy/icons8-like-30.png"  alt="" /></div>
    </div>

  </div>)} */}
          
      </div>
      </div>
  )
}

export default Newsline