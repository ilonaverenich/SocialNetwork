import React, { useState, useEffect } from 'react';
import {Input,Button} from 'antd'
import io from 'socket.io-client';
import axios from 'axios';

const socket = io.connect('http://localhost:1000'); // Замените на адрес вашего сервера

function Chat() {
  const token = localStorage.getItem('token');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [email, setEmail] = useState('');
  const [datas, setDatas] = useState([]);
  const [user,setUser] = useState('')

  useEffect(() => {
    setTimeout(()=>{axios.post('http://localhost:1000/main', { token }).then((res) => setEmail(res.data.email))},500)
  }, []);

  useEffect(() => {
    console.log(email)
    if (email) {
      axios.post('http://localhost:1000/friends', { email }).then((res) => {
        setDatas(res.data);
      });
    }
  }, [email]); 
 
  const sendMessage = () => {
    socket.emit('send-message', { text: message });
    console.log(message)
    setMessage('');

  };
  useEffect(() => {
    socket.on('receive-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  function getUser(email){
    setUser(email)
  }
 
  return (
    <div>
    
      

     

      <div className='chat'>
        <div className='chat-friends'>
          {datas && datas.map(user=><p onClick={()=>getUser(user.email)} className='chat-user'>{user.name} {user.surname}</p>)}

        </div>
        <div className='chat-message'>

        <div className='block-message'>
          <span className='name'>{user}</span>
        {messages.map((message, index) => (
          <p className='mess' key={index}> <span className='name'>{email}</span> {message.text} </p>
        ))}
      </div>
        <div className='message-send'>
        <Input
        type="text"
        className='chat-send-input'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button className='chat-send-btn' onClick={sendMessage}>Отправить</Button>
        </div>
        
        </div>
      </div>
    </div>
  );
}

export default Chat;