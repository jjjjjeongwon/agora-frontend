import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://3.35.5.22:8080');

let myId;

const ThreeTest = () => {
  const [balls, setBalls] = useState([]);
  console.log(balls);
  //   const [myId, setMyId] = useState(null);
  //   const [radius, setRadius] = useState(16);
  const radius = 16;
  const [keys, setKeys] = useState({
    right: false,
    left: false,
    up: false,
    down: false,
  });
  //   const socketRef = useRef();
  const canvasRef = useRef();
  const ballMap = useRef({});

  const PlayerBall = (id, color, x, y) => ({
    id,
    color: color,
    x: Math.random() * 500,
    y: Math.random() * 500,
  });
  console.log('check!!!', myId);

  console.log(socket);
  useEffect(() => {
    socket.on('user_id', (data) => {
      myId = data;
      console.log('check222!!!', myId);
    });

    socket.on('join_user', (data) => {
      joinUser(data.id, data.color, data.x, data.y);
    });

    socket.on('leave_user', (data) => {
      leaveUser(data);
    });

    socket.on('update_state', (data) => {
      updateState(data.id, data.x, data.y);
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
    let ball = PlayerBall(id, color, x, y);

    setBalls((balls) => [...balls, ball]);
    ballMap.current[id] = ball;

    return ball;
  };

  const leaveUser = (id) => {
    setBalls((balls) => balls.filter((ball) => ball.id !== id));
    delete ballMap.current[id];
  };

  const updateState = (id, x, y) => {
    let ball = ballMap.current[id];
    if (!ball) {
      return;
    }
    ball.x = x;
    ball.y = y;
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    balls.forEach((ball, i) => {
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.font = '15px Arial';
      ctx.fillText(`player ${i}`, ball.x - radius - 7, ball.y - radius);
      ctx.closePath();
    });
  }, [balls]);

  return (
    <div>
      {balls.map((ball) => (
        <div key={ball.id} />
      ))}
      <canvas ref={canvasRef} id="myCanvas" width="1024" height="768" />;
    </div>
  );
};

export default ThreeTest;
