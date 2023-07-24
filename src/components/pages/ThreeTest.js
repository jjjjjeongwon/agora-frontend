import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://3.35.5.22:8080');

const ThreeTest = () => {
  const roomName = useParams().id;
  const [nickName, setNickName] = useState('');
  const [sendNickName, setSendNickName] = useState('');
  const [balls, setBalls] = useState([]);
  const [ballMap, setBallMap] = useState({});

  const [myId, setMyId] = useState(null);
  const playerSpeed = 1;
  const radius = 16;
  const [keys, setKeys] = useState({
    right: false,
    left: false,
    up: false,
    down: false,
  });
  const canvasRef = useRef();

  const handleRoomSubmit = (event) => {
    event.preventDefault();
    setSendNickName(nickName);
    const data = {
      nickname: nickName,
      roomName: roomName,
    };
    setMyId(data.nickname);

    socket.emit('enter_room', data);
  };
  const renderPlayer = () => {
    let curPlayer = ballMap[myId];

    if (keys.right) {
      curPlayer.x += playerSpeed;
    }
    if (keys.left) {
      curPlayer.x -= playerSpeed;
    }
    if (keys.up) {
      curPlayer.y -= playerSpeed;
    }
    if (keys.down) {
      curPlayer.y += playerSpeed;
    }
    sendData();
  };

  useEffect(() => {
    socket.on('join_user', (data) => {
      joinUser(data.id, data.color, data.x, data.y);
    });

    socket.on('bye', (data) => {
      leaveUser(data);
    });

    socket.on('update_state', (data) => {
      updateState(data.id, data.color, data.x, data.y);
    });

    const keyDownHandler = (e) => {
      switch (e.code) {
        case 'ArrowRight':
          setKeys((keys) => ({ ...keys, right: true }));
          break;
        case 'ArrowLeft':
          setKeys((keys) => ({ ...keys, left: true }));
          break;
        case 'ArrowDown':
          setKeys((keys) => ({ ...keys, down: true }));
          break;
        case 'ArrowUp':
          setKeys((keys) => ({ ...keys, up: true }));
          break;
        default:
          break;
      }
    };

    const keyUpHandler = (e) => {
      switch (e.code) {
        case 'ArrowRight':
          setKeys((keys) => ({ ...keys, right: false }));
          break;
        case 'ArrowLeft':
          setKeys((keys) => ({ ...keys, left: false }));
          break;
        case 'ArrowDown':
          setKeys((keys) => ({ ...keys, down: false }));
          break;
        case 'ArrowUp':
          setKeys((keys) => ({ ...keys, up: false }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      socket.disconnect();
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  const joinUser = (id, color, x, y) => {
    const newBall = { id, color, x, y };

    setBalls((prevBalls) => [...prevBalls, newBall]);

    setBallMap((prevBallMap) => ({ ...prevBallMap, [id]: newBall }));
  };

  const leaveUser = (id) => {
    setBalls((balls) => balls.filter((ball) => ball.id !== id));
    delete ballMap[id];
  };

  const updateState = (id, color, x, y) => {
    setBalls((prevBalls) => {
      return prevBalls.map((ball) =>
        ball.id === id ? { ...ball, color: color, x: x, y: y } : ball
      );
    });
  };

  const sendData = () => {
    if (myId) {
      let curPlayer = ballMap[myId];
      let data = {};
      data = {
        id: curPlayer.id,
        x: curPlayer.x,
        y: curPlayer.y,
        color: curPlayer.color,
        roomName: roomName,
      };
      if (data) {
        socket.emit('send_location', data);
      }
    }
  };
  useEffect(() => {
    const ctx = canvasRef?.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    balls.forEach((ball, i) => {
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.font = '15px Arial';
      ctx.fillText(`${ball.id}`, ball.x - radius - 7, ball.y - radius);
      ctx.closePath();
    });
  }, [balls, keys]);

  useEffect(() => {
    if (myId && (keys.right || keys.left || keys.up || keys.down)) {
      const update = setInterval(() => {
        renderPlayer();
      }, 10);
      return () => clearInterval(update);
    }
  }, [myId, keys]);
  return (
    <div>
      <canvas ref={canvasRef} id="myCanvas" width="1024" height="768" />
      {sendNickName ? (
        <div>
          {balls.map((ball) => (
            <div key={ball.id} />
          ))}
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter your nickname"
            onChange={(e) => setNickName(e.target.value)}
          />
          <button type="submit" onClick={handleRoomSubmit}>
            Enter Room
          </button>
        </div>
      )}
    </div>
  );
};

export default ThreeTest;
