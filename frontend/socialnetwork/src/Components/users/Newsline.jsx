import {useEffect, useState} from 'react';
import {Input, Button, Upload} from 'antd'
import axios from 'axios';

function Newsline() {
  const token = localStorage.getItem('token');
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});
  const [values, setValues] = useState('');
  const [list, setList] = useState({
    postId: (new Date()).getTime(),
    likes: 0,
    photo: ''
  });
console.log(data)
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
  }, [state]);

  useEffect(() => {
    setList({ ...list, postId: (new Date()).getTime().toString() }); // Convert to string
    console.log(list);
  }, [state]);


  function addList() {
    setState((prev) => !prev);
    setList({ ...list, comment: values, id: data._id }); // Добавляем id в объект list
    setValues('');
  
    axios.post('http://localhost:1000/posts', list)
      .then(result => console.log(result))
      .catch(error => console.error('Ошибка при отправке комментария:', error));
  }

  function deletePost(postId) {
    const id = data.id;
    axios.post('http://localhost:1000/deletepost', { postId, id })
      .then(res => {
        const updatedComments = comments.filter(item => item.postId !== postId);
        setComments(updatedComments);
      })
      .catch(err => console.error('Ошибка при удалении комментария:', err));
  }
  
  const onChange = (info) => {
    if (info.file.status === 'done') {
      console.log(info.file.response);
      const photoUrl = info.file.response.image;
      console.log('photoUrl', photoUrl);
      const newComment = { ...list, photo: photoUrl };
      setComments([...comments, newComment]);
    }
  };


  const uploadProps = {
    name: 'image',
    action: 'http://localhost:1000/posts',
    headers: {
      id: data._id,

    },
    onChange: onChange,
    customRequest: ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('postId', list.postId);
      formData.append('likes', list.likes);
      formData.append('comment', list.comment);

      axios.post('http://localhost:1000/posts', formData, {
        headers: {
          'id': data._id
        }
      })
    },
  };
  return (
    <div className='block'>
      <div className='bold'>Моя лента</div>
        <hr></hr>
      <div className='container-newsline'>
   {/*    <img width='50px' className='img' height='50px' src={`http://localhost:1000/${data.image}`} alt="Изображение" /> */}
      <Input className='input-newsline' value={values} onChange={e=>setValues(e.target.value)} placeholder='Написать на стенке'></Input>
      <Upload {...uploadProps} onClick={()=> setList({ ...list, id: data._id })}>
       <img className='attach'  src='https://i.postimg.cc/8P9vK0TY/icons8-30.png'></img>
      </Upload> 
     
   
      <Button className='btn-newsline' onClick={()=>addList()}>Отправить</Button>
      </div>
      <div className='content-newsline'>
              {comments && comments.map(item => (
          <div className='block-newsline' key={item.postId}>
            <div className='box-newsline'>
              <div className='icon-newsline'>
                
                {item.photo && <img width='35px' className='img' height='35px' src={item.photo} alt="Изображение" />}
              </div>
              <div className='posts'>
              <div className='comment-newsline'>{item.comment}</div>
              <div className='comment-newsline'><img width='200px' height='200px' src={`http://localhost:1000/${item && item.image}`} alt="Изображение" /></div>
              <div>time</div>
              </div>
            </div>
            <div className='content-newsline-icons'>
              <div className=''><img src="https://i.postimg.cc/c4jxWM0N/icons8-delete-24.png" onClick={() => deletePost(item.postId)} alt="Удалить комментарий" /></div>
              <div className=''><img src="https://i.postimg.cc/PrQMYBwy/icons8-like-30.png" alt="" /></div>
            </div>
          </div>
        ))} 
          
      </div>
      </div>
  )
}

export default Newsline