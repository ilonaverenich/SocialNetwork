import React, { useState, useEffect } from 'react';
import {Input,Button} from 'antd'
import socketIO from 'socket.io-client';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Chat() {
  const socket = socketIO.connect('http://localhost:1000');
  const token = localStorage.getItem('token');
  
  const [email, setEmail] = useState('');
  const [datas, setDatas] = useState([]);


  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.post('http://localhost:1000/main', { token }).then((res) => setDatas(res.data))
    setEmail(datas.email)
  }, []);

  useEffect(()=>{
    socket.on('response',(data)=>setMessages([...messages, data]))
    console.log(messages)
  },[socket])

/*   useEffect(() => {
    if (email) {
      axios.post('http://localhost:1000/friends', { email }).then((res) => {
        setDatas(res.data);
        console.log(datas)
      });
    }
  }, []);  */
 
  function sendSocketMessage(){
  
    socket.emit('message',{
      name: datas.name,
      message,
      socketId: socket.id
    }) 
     setMessage('')
  }
console.log(datas.name)

  return (
    <div>
    <div className='chat'>
      <div className='chat-friends'>
      
      </div>
      <div className='chat-message'>
      <div className='block-message'>
         {/* {messages.map(el=><div>{el.name} {el.message}</div>)} */}


         {messages.map(el=><div>{el.name == datas.name ? (<div className='my-message message'> <b>{el.name}: </b> <span className='send-mess'> {el.message}</span></div>) : (<div className='friend-message message'><b>{el.name}: </b><span className='send-mess'> {el.message}</span></div>)} 
       
         </div>)}

        
        </div>
        <div className='message-send'>
         <span className='message-name'>{datas.name}</span>: <Input
            type='text'
            className='chat-send-input'
            onChange={(e)=>setMessage(e.target.value)}
            value={message}
          />
          <Button className='chat-send-btn' onClick={sendSocketMessage}>
            Отправить
          </Button>

       
        </div>
      </div>
    </div>
  </div>
  );
}

export default Chat;