import React, { useState, useEffect } from 'react';
import {Input,Button} from 'antd'
import io from 'socket.io-client';
import axios from 'axios';

const socket = io.connect('http://localhost:1000');

function Chat() {
  const token = localStorage.getItem('token');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [email, setEmail] = useState('');
  const [datas, setDatas] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);


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
    if (!selectedFriend) {
      socket.emit('send-message', { text: message });
    } else {
      socket.emit('private-message', {
        senderEmail: email,
        recipientEmail: selectedFriend.email,
        text: message,
      });
    }
    console.log(messages)
    setMessage('');
  };
  
  useEffect(() => {
    socket.on('receive-message', (data) => {
      console.log('Сервер получил сообщение:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  
    socket.on('receive-private-message', (data) => {
      console.log('Сервер получил приватное сообщение:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const selectFriend = (friend) => {
    console.log(friend)
    setSelectedFriend(friend);
    setMessages([]); 
  };


  return (
    <div>
    <div className='chat'>
      <div className='chat-friends'>
        {datas &&
          datas.map((friend) => (
            <p key={friend.email} onClick={() => selectFriend(friend)} className='chat-user'>
              {friend.name} {friend.surname}
            </p>
          ))}
      </div>
      <div className='chat-message'>
      <div className='block-message'>
          <span className='name'>{selectedFriend ? selectedFriend.name : 'Общий чат'}</span>
          {messages.map((message, index) => (
            <p className='mess' key={index}>
              <span className='name'>{message.senderEmail}</span> {message.text}
            </p>
          ))}
        </div>
        <div className='message-send'>
          <Input
            type='text'
            className='chat-send-input'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button className='chat-send-btn' onClick={sendMessage}>
            Отправить
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Chat;