import {useEffect, useState} from 'react';
import {Input, Button} from 'antd'
import axios from 'axios';
import {useSelector} from 'react-redux'

function Newsline() {
  const token = localStorage.getItem('token');
  const [comments,setComments] = useState([])
  const [data,setData] = useState([])
  const [values, setValues] = useState('')
  const [list, setList] = useState({
    postId:(new Date()).getTime(),
    likes:0,
    
    
  })

  const [state, setState] = useState(false)


  useEffect(()=>{
    axios.post('http://localhost:1000/main',{token}).then(res=>setList({ ...list, id: res.data.id }))
    },[])


  useEffect(()=>{
    axios.post('http://localhost:1000/main',{token}).then(res=>setComments(res.data.comments));
    axios.post('http://localhost:1000/main',{token}).then(res=>setData(res.data));
 
    },[]) 


   useEffect(() => {
    setList({ ...list, postId: (new Date()).getTime().toString() }); // Convert to string
    console.log(list)
    axios.post('http://localhost:1000/posts', list).then(result => console.log(result));
  }, [state]); 


  function addList() {
    setState((prev)=>!prev)
    setList({...list, comment: values})
  
    setValues('')

  
  }

function deletePost(postId) {
  const id = data.id;
  axios.post('http://localhost:1000/deletepost', { postId, id })
    .then(res => console.log(res))
    .catch(err => console.error('Ошибка при удалении комментария:', err));
}


  return (
    <div className='block'>
      <div className='bold'>Моя лента</div>
        <hr></hr>
      <div className='container-newsline'>
   {/*    <img width='50px' className='img' height='50px' src={`http://localhost:1000/${data.image}`} alt="Изображение" /> */}
      <Input className='input-newsline' value={values} onChange={e=>setValues(e.target.value)} placeholder='Написать на стенке'></Input>
   
      <Button className='btn-newsline' onClick={()=>addList()}>Отправить</Button>
      </div>
      <div className='content-newsline'>
     
       {comments && comments.map(item=><div className='block-newsline'>
       <div className='box-newsline'>
                 <div className='icon-newsline'><img width='35px' className='img' height='35px' src={`http://localhost:1000/${data.image}`} alt="Изображение" /></div>
                <div className='comment-newsline'> {item.comment}</div>
          </div> 
          <div className='content-newsline-icons'>
        <div className=''><img src="https://i.postimg.cc/c4jxWM0N/icons8-delete-24.png" onClick={()=>deletePost(item.postId)}></img></div>
        <div className=''><img src="https://i.postimg.cc/PrQMYBwy/icons8-like-30.png"  alt="" /></div>
    </div>
        
        </div>)} 
          
      </div>
      </div>
  )
}

export default Newsline