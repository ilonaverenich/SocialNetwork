import {useEffect, useState} from 'react';
import {Input, Button,} from 'antd'
import axios from 'axios';

function Newsline() {
  const token = localStorage.getItem('token');
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});
  const [values, setValues] = useState('');
  const [image, setImage] = useState({});
  const [wallUpdated, setWallUpdated] = useState(false); 
  const [countLikes, setCountLikes] = useState(0);

  const [state, setState] = useState(false);

  useEffect(() => {
    axios.post('http://localhost:1000/main', { token })
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных о пользователе:', error);
      });
  }, [token]);

  useEffect(() => {

    axios.post('http://localhost:1000/main', { token })
      .then(res => {
        setComments(res.data.comments);
        setData(res.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных о пользователе:', error);
      });
  }, [state,wallUpdated]);


  function addList() {
    setState((prev) => !prev);
    setValues('');
    const id = data._id;
    const formData = new FormData();
    formData.append('id', id)
    formData.append('comment', values)
    formData.append('image', image)
    formData.append('postId',(new Date()).getTime().toString())
    formData.append('likes', countLikes)
   
    axios.post('http://localhost:1000/posts', formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(result =>  setWallUpdated(prev => !prev))
      .catch(error => console.error('Ошибка при отправке комментария:', error));

  
  }

  function deletePost(postId) {
    const id = data._id;
    axios.post('http://localhost:1000/deletepost', { postId, id })
      .then(res => {
        const updatedComments = comments.filter(item => item.postId !== postId);
        setComments(updatedComments);
      })
      .catch(err => console.error('Ошибка при удалении комментария:', err));
   
  }


    return (
    <div className='block'>
      <div className='bold'>Моя лента</div>
        <hr></hr>
      <div className='container-newsline'>
      <Input className='input-newsline' value={values} onChange={e=>setValues(e.target.value)} placeholder='Написать на стенке'></Input>
      

  <input type="file" name="photo" placeholder="Прикрепите файл" onChange={(e)=>setImage(e.target.files[0])}/>

   
      <Button className='btn-newsline' onClick={()=>addList()}>Отправить</Button>
      </div>
      <div className='content-newsline'>
              {comments && comments.map(item => (
          <div className='content-newsline-post' key={item.postId}>
            <div className='posts'>
                <div className='post-header'>
                <div className='post-header-logo'> 
                      {data.image && <img width='50px' height='50px' src={`http://localhost:1000/${data.image}`} alt="Изображение" />}  
                </div>
                      <div className='post-header-body'>
                        <div className='post-body-name'>
                          {data.name} {data.surname}  <span className='post-body-email'>@{(data.email).slice(0,8)}</span> 
                        </div>
                       
                        <div className='post-time-edit'> 
                            
                           
                 
                        <div className='post-time-delete'>
                          
                          <div>{item.timestamp.slice(8,10)}.{item.timestamp.slice(5,7)}.20{item.timestamp.slice(2,4)}</div>
                          <div>{item.timestamp.slice(11,16)}</div>

            
                        
                          </div>
                          <img src="https://i.postimg.cc/c4jxWM0N/icons8-delete-24.png" className='post-body-delete-img' onClick={() => deletePost(item.postId)} alt="Удалить комментарий" /> 
                        </div>
                      </div>

                </div>
                <div className='post-body-comment'>{item.comment}</div>
                  <div className='post-body'>
                  {item.image ? <img  className='post-body-img' src={`http://localhost:1000/${item.image}`} alt="Изображение" /> :''}
                  </div>

                <div className='post-footer'>
           {/*      <div className='post-footer-comment'>коментировать</div> */}
               {/*    <div>
                     <img className='post-footer-like' src="https://i.postimg.cc/tTkNg3Vg/icons8-filled-heart-32-1.png" alt="" />
                     {item.likes}
                  </div> */}
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

export default Newsline