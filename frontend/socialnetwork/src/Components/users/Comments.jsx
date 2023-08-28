import {useSelector} from 'react-redux';
import {Input, Button } from 'antd';
import {useState,useEffect} from 'react'
import axios from 'axios';

function Comments() {
    const token = localStorage.getItem('token');
    const data = useSelector((store) => store.data.mainUser);
    const [datas, setDatas] = useState({});
    const [user, setUser] = useState(data.comments);

    const [value,setValue] = useState('')
    useEffect(() => {
      axios.post('http://localhost:1000/main', { token })
        .then(res => {
          setDatas(res.data);
        })
        .catch(error => {
          console.error('Ошибка при получении данных о пользователе:', error);
        });
    }, [token]);


    function handlerSendPost (){
      const id = data._id;
      setValue('')
      const formData = new FormData();
      formData.append('id', id)
      formData.append('comment', value)
      formData.append('postId',(new Date()).getTime().toString())
     
      formData.append('name',datas.name)
      formData.append('surname',datas.surname)
      formData.append('email',datas.email)
      formData.append('icon',datas.image)

      axios.post('http://localhost:1000/posts', formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res=>setUser((res.data.comments)))
    }
console.log(user)
  return (
    <div>
      <div className='bold'>Лента</div>
        <hr></hr>
        <div className='container-newsline'>
          <Input className='input-newsline' value={value} onChange={(e)=>setValue(e.target.value)} placeholder='Написать на стенке'></Input>
          <Button className='btn-newsline' onClick={handlerSendPost}>Отправить</Button></div>
        
        <div className='content-newsline'>
              {user && user.map(item => (
          <div className='content-newsline-post' key={item.postId}>
            <div className='posts'>
                <div className='post-header'>
                <div className='post-header-logo'> 
                      <img width='50px' height='50px' src={`http://localhost:1000/${item.logo ?item.logo:data.image}`} alt="Изображение" />
                </div>
                      <div className='post-header-body'>
                      
                        <div className='post-body-name'>

                                {item.name?item.name:data.name} {item.surname?item.surname:data.surname}
                                <span className='post-body-email'>@{item.email?item.email:data.email}</span> 
                                
                        </div>
                       
                      
                        <div className='post-time-edit'> 
                        <div className='post-time-delete'>
                          
                          <div>{item.timestamp.slice(8,10)}.{item.timestamp.slice(5,7)}.20{item.timestamp.slice(2,4)}</div>
                          <div>{item.timestamp.slice(11,16)}</div>

                      </div>
                        
                          </div>
                      </div>
                </div>
                <div className='post-body-comment'>{item.comment}</div>
                <div className='post-body'>
                {item.image ? <img  className='post-body-img' src={`http://localhost:1000/${item.image}`} alt="Изображение" /> :''}
                </div>

                <div className='post-footer'>
               {/*  <div className='post-footer-comment'>Лайк!</div> */}
                <div></div>
                </div>

              </div>
          
              <div >
    
            </div>
          </div>
        ))} 
          
      </div>

    </div>
  )
}

export default Comments