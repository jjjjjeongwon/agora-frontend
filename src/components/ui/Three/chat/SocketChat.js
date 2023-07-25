import React, { useEffect, useState } from 'react';
import TalkBubble from './TalkBubble';

function SocketChat({ roomName, socket }) {
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [nickName, setNickName] = useState('');
  const [sendNickName, setSendNickName] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  console.log('닉네임', nickName);
  console.log('보내는 닉네임', sendNickName);

  useEffect(() => {
    // 소켓 이벤트 핸들러 등록
    socket.on('welcome', (user, newCount) => {
      setWelcomeMessage(`${newCount}명 in ${roomName}`);
      setMessageList((prevList) => [...prevList, `${user} : 입장`]);
    });

    socket.on('bye', (left, newCount) => {
      setWelcomeMessage(`${newCount}명 in ${roomName}`);
      setMessageList((prevList) => [...prevList, `${left} : 퇴장`]);
    });

    socket.on('new_message', (message) => {
      setMessageList((prevList) => [...prevList, message]);
    });

    //이동 좌표
    socket.on('move', () => {});

    return () => {
      // 컴포넌트 언마운트 시 소켓 이벤트 핸들러 해제
      socket.off('welcome');
      socket.off('bye');
      socket.off('new_message');
    };
  }, [roomName]);

  const handleRoomSubmit = (event) => {
    event.preventDefault();
    setSendNickName(nickName);
    // console.log('닉네임', nickName);
    const data = {
      nickName: nickName,
      roomName: roomName,
    };
    socket.emit('enter_room', data);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    socket.emit('new_message', inputMessage, roomName, () => {
      setMessageList((prevList) => [...prevList, `you: ${inputMessage}`]);
      setInputMessage('');
    });
  };

  return (
    // 임시 UI
    <div>
      {sendNickName ? (
        <div>
          <h3>Room: {roomName}</h3>
          <ul>
            {messageList.map((message, index) => (
              <TalkBubble key={index} message={message} />
              // <li key={index}>{message}</li>
            ))}
          </ul>
          <form id="msg" onSubmit={handleMessageSubmit}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Enter your message"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter your nickname"
            onChange={(e) => setNickName(e.target.value)}
          />
          <button onClick={handleRoomSubmit}>Enter Room</button>
        </div>
      )}
      <h3>{welcomeMessage}</h3>
    </div>
  );
}

export default SocketChat;
