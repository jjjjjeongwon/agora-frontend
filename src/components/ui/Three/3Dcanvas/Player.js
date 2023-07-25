import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { useState, useEffect } from 'react';

// global state
import { useRecoilState } from 'recoil';
import { LoginState, UserState } from '../../../../state/UserAtom';
const Player = ({ socket, roomName }) => {
  const glb = useGLTF('../models/ilbuni.glb');
  const playerMesh = glb.scene.children[0];
  playerMesh.position.y = 0.5;
  const three = useThree();
  const speed = 0.05;
  const [players, setPlayers] = useState([]);
  const [playerMap, setPlayerMap] = useState({});

  const [myId, setMyId] = useRecoilState(UserState);

  const [isLogin, setIsLogin] = useRecoilState(LoginState);

  const mixer = new THREE.AnimationMixer(playerMesh);
  const actions = [
    mixer.clipAction(glb.animations[0]),
    mixer.clipAction(glb.animations[1]),
  ];
  playerMesh.userData.animations = actions;

  const [keys, setKeys] = useState({
    right: false,
    left: false,
    up: false,
    down: false,
  });

  const joinUser = (id, color, x, z) => {
    const newPlayer = { id, color, x, z };

    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);

    setPlayerMap((prevPlayerMap) => ({ ...prevPlayerMap, [id]: newPlayer }));
  };

  const leaveUser = (id) => {
    setPlayers((players) => players.filter((player) => player.id !== id));
    delete playerMap[id];
  };

  const updateState = (id, color, x, z) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) =>
        player.id === id ? { ...player, color: color, x: x, z: z } : player
      );
    });
  };

  const sendData = () => {
    if (myId && isLogin) {
      let curPlayer = playerMap[myId];
      let data = {};
      data = {
        id: curPlayer.id,
        x: curPlayer.x,
        z: curPlayer.z,
        color: curPlayer.color,
        roomName: roomName,
      };
      if (data) {
        socket.emit('send_location', data);
      }
    }
  };

  const renderPlayer = () => {
    let curPlayer = playerMap[myId];

    if (keys.right) {
      playerMesh.position.x += speed;
      curPlayer.x = playerMesh.position.x;
    }
    if (keys.left) {
      playerMesh.position.x -= speed;
      curPlayer.x = playerMesh.position.x;
    }
    if (keys.up) {
      playerMesh.position.z -= speed;
      curPlayer.z = playerMesh.position.z;
    }
    if (keys.down) {
      playerMesh.position.z += speed;
      curPlayer.z = playerMesh.position.z;
    }

    sendData();
  };

  useEffect(() => {
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

    socket.on('join_user', (data) => {
      console.log('join_user', data);
      joinUser(data.id, data.color, data.x, data.z);
    });

    socket.on('bye', (data) => {
      leaveUser(data);
    });

    socket.on('update_state', (data) => {
      console.log('update_state', data);
      updateState(data.id, data.color, data.x, data.z);
    });

    const keyDownHandler = (e) => {
      switch (e.code) {
        case 'ArrowRight':
        case 'KeyD':
          setKeys((keys) => ({ ...keys, right: true }));
          playerMesh.userData.moving = true;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setKeys((keys) => ({ ...keys, left: true }));
          playerMesh.userData.moving = true;
          break;
        case 'ArrowDown':
        case 'KeyS':
          setKeys((keys) => ({ ...keys, down: true }));
          playerMesh.userData.moving = true;
          break;
        case 'ArrowUp':
        case 'KeyW':
          setKeys((keys) => ({ ...keys, up: true }));
          playerMesh.userData.moving = true;
          break;
        default:
          break;
      }
    };

    const keyUpHandler = (e) => {
      switch (e.code) {
        case 'ArrowRight':
        case 'KeyD':
          setKeys((keys) => ({ ...keys, right: false }));
          playerMesh.userData.moving = false;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setKeys((keys) => ({ ...keys, left: false }));
          playerMesh.userData.moving = false;
          break;
        case 'ArrowDown':
        case 'KeyS':
          setKeys((keys) => ({ ...keys, down: false }));
          playerMesh.userData.moving = false;
          break;
        case 'ArrowUp':
        case 'KeyW':
          setKeys((keys) => ({ ...keys, up: false }));
          playerMesh.userData.moving = false;
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  useEffect(() => {
    if (myId && (keys.right || keys.left || keys.up || keys.down)) {
      const update = setInterval(() => {
        renderPlayer();
      }, 10);
      return () => clearInterval(update);
    }
  }, [myId, keys]);

  useFrame((state, delta) => {
    if (!playerMesh) return;
    // TODO 이곳에서 이동로직 처리
    mixer.update(delta);

    if (playerMesh.userData.moving) {
      playerMesh.userData.animations[0].stop();
      playerMesh.userData.animations[1].play();
    } else {
      playerMesh.userData.animations[0].play();
      playerMesh.userData.animations[1].stop();
    }
  });
  return <primitive object={glb.scene} dispose={null} />;
};

export default Player;
