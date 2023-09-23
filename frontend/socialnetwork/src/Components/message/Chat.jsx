import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import axios from 'axios';

function Chat({ socket }) {
  const token = localStorage.getItem('token');

  const [email, setEmail] = useState('');
  const [datas, setDatas] = useState({});
  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [currentRoomMessages, setCurrentRoomMessages] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:1000/main', { token });
        setDatas(response.data);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
      }
    };

    fetchUserData();
  }, [token]);

useEffect(() => {
  socket.on('privateMessage', (data) => {

    setMessages((prevMessages) => [...prevMessages, data]);
    setCurrentRoomMessages((prevMessages) => [...prevMessages, data]);
  });

  socket.on('roomJoined', (message) => {
    console.log(message);
  });
}, [socket]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.post('http://localhost:1000/friends', { email });
        setFriends(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке списка друзей:', error);
      }
    };

    fetchFriends();
  }, [email]);


  function createRoomName(userId1, userId2) {
    return `room_${userId1}_${userId2}`;
  }

  function sendPrivateMessage(user) {
    setCurrentChatUser(user);
    const roomName = createRoomName(datas._id, user._id);
    socket.emit('joinRoom', roomName);

    setCurrentRoomMessages([]);
  }
  function sendSocketMessage() {
    if (message.trim() !== '' && currentChatUser) {
      const roomName = createRoomName(datas._id, currentChatUser._id);
      const newMessage = {
        sender: datas._id,
        recipient: currentChatUser._id, // Добавляем айди получателя
        message,
        senderName: datas.name, // Добавляем имя отправителя
        recipientName: currentChatUser.name, // Добавляем имя получателя
      }; 
      socket.emit('privateMessage', { recipient: currentChatUser._id, message, roomName });
      setMessage('');
      setCurrentRoomMessages((prevMessages) => [...prevMessages, newMessage]); 
    }
  }
   
  function createRoomName(userId1, userId2) {
    const sortedUserIds = [userId1, userId2].sort();
    return `room_${sortedUserIds[0]}_${sortedUserIds[1]}`;
  }
 

  return (
    <div>
      <div className='chat'>
        <div className='chat-friends'>
        {console.log(friends)} 
        
          {friends.map((user) => (
            <div
              key={user._id}
              className={`chat-friends-item ${currentChatUser && currentChatUser._id === user._id ? 'active' : ''}`}
              onClick={() => sendPrivateMessage(user)}
            >
              {user.name} {user.surname}
            </div>
          ))}
        </div>
        <div className='chat-message'>
          <div className='block-message'>
          {console.log(currentRoomMessages)}
          {currentRoomMessages.map((el, index) => (
  <div
    key={index}
    className={`message ${el.sender === datas._id ? 'my-message' : 'friend-message'}`}
  >
    <b>{el.senderName }:</b>
    <p>{console.log(el.recipient,friends)}</p>
    {/* {friends.map(item=><div>{item._id == el.recipient?'dd':'dddd'}</div>)} */}
   
    <span className='send-mess'>{el.message}</span>
  </div>
))}







          </div>
          {currentChatUser && (
            <div className='message-send'>
              <span className='message-name'>{datas.name}</span>: {' '}
              <Input
                type='text'
                className='chat-send-input'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <Button className='chat-send-btn' onClick={sendSocketMessage}>Отправить
                </Button>
               

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
