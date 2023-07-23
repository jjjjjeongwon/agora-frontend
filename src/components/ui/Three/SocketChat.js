import React, { useEffect, useState } from 'react';

function SocketChat({ roomName, socket }) {
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [nickName, setNickName] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // 소켓 이벤트 핸들러 등록
    socket.on('welcome', (user, newCount) => {
      setWelcomeMessage(`${newCount}명 in ${roomName}`);
      setMessageList((prevList) => [...prevList, `${user} 입장`]);
    });

    socket.on('bye', (left, newCount) => {
      setWelcomeMessage(`${newCount}명 in ${roomName}`);
      setMessageList((prevList) => [...prevList, `${left} 퇴장`]);
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
    setNickName(event.target.elements.name);
    socket.emit('enter_room', roomName, nickName);
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
      {nickName ? (
        <div>
          <h3>Room: {roomName}</h3>
          <ul>
            {messageList.map((message, index) => (
              <li key={index}>{message}</li>
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
        <form onSubmit={handleRoomSubmit}>
          <input type="text" name="name" placeholder="Enter your nickname" />
          <button type="submit">Enter Room</button>
        </form>
      )}
      <h3>{welcomeMessage}</h3>
    </div>
  );
}

export default SocketChat;
