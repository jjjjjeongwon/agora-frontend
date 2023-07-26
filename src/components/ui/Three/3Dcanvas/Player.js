import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useState, useEffect } from 'react';
// global state
import { useRecoilState } from 'recoil';
import { LoginState, UserState } from '../../../../state/UserAtom';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const Player = ({ socket, roomName, myPlayer, setMyPlayer }) => {
  const glb = useGLTF('../models/Bear.glb');
  const playerMesh = glb.scene.children[0];
  playerMesh.position.y = 0.7;
  playerMesh.scale.set(0.5, 0.5, 0.5);
  const mixers = [];

  const speed = 0.05;
  const [players, setPlayers] = useState([]);
  const [playerMap, setPlayerMap] = useState({});
  const [myId, setMyId] = useRecoilState(UserState);
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const [keys, setKeys] = useState({
    right: false,
    left: false,
    up: false,
    down: false,
  });
  const joinUser = (id, x, z) => {
    if (playerMap[id]) {
      return;
    }
    const clonedPlayreMesh = SkeletonUtils.clone(playerMesh);
    clonedPlayreMesh.position.set(x, playerMesh.position.y, z);
    clonedPlayreMesh.scale.set(0.5, 0.5, 0.5);

    const mixer = new THREE.AnimationMixer(clonedPlayreMesh);
    mixers.push(mixer);

    const action1 = mixer.clipAction(glb.animations[0]);
    const action2 = mixer.clipAction(glb.animations[1]);

    clonedPlayreMesh.userData.animations = [action1, action2];

    const newPlayer = { id, playerMesh: clonedPlayreMesh };

    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);

    setPlayerMap((prevPlayerMap) => ({ ...prevPlayerMap, [id]: newPlayer }));
  };

  const leaveUser = (id) => {
    setPlayers((players) => players.filter((player) => player.id !== id));
    delete playerMap[id];
  };

  const updateState = (id, x, z) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === id) {
          player.playerMesh.position.x = x;
          player.playerMesh.position.z = z;
        }
        return player;
      });
    });
  };

  const renderPlayer = () => {
    let curPlayer = playerMap[myId];
    if (keys.right) {
      curPlayer.playerMesh.position.x += speed;
    }
    if (keys.left) {
      curPlayer.playerMesh.position.x -= speed;
    }
    if (keys.up) {
      curPlayer.playerMesh.position.z -= speed;
    }
    if (keys.down) {
      curPlayer.playerMesh.position.z += speed;
    }

    sendData(curPlayer.playerMesh.position.x, curPlayer.playerMesh.position.z);
  };

  const sendData = (x, z) => {
    if (myId && isLogin) {
      let data = {};
      data = {
        id: myId,
        x: x,
        z: z,
        roomName: roomName,
      };
      if (data) {
        setMyPlayer(data);
        socket.emit('send_location', data);
      }
    }
  };

  useEffect(() => {
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    socket.on('join_user', (data) => {
      // console.log('join_user', data);
      // console.log(data);
      joinUser(data.id, data.x, data.z);
    });

    socket.on('bye', (data) => {
      leaveUser(data);
    });

    socket.on('update_state', (data) => {
      // console.log('update_state', data);
      updateState(data.id, data.x, data.z);
    });

    const keyDownHandler = (e) => {
      switch (e.code) {
        case 'ArrowRight':
        case 'KeyD':
          setKeys((keys) => ({ ...keys, right: true }));
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setKeys((keys) => ({ ...keys, left: true }));
          break;
        case 'ArrowDown':
        case 'KeyS':
          setKeys((keys) => ({ ...keys, down: true }));
          break;
        case 'ArrowUp':
        case 'KeyW':
          setKeys((keys) => ({ ...keys, up: true }));
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
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setKeys((keys) => ({ ...keys, left: false }));
          break;
        case 'ArrowDown':
        case 'KeyS':
          setKeys((keys) => ({ ...keys, down: false }));
          break;
        case 'ArrowUp':
        case 'KeyW':
          setKeys((keys) => ({ ...keys, up: false }));
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

  useFrame((delta) => {
    let curPlayer = playerMap[myId];
    if (curPlayer && curPlayer.playerMesh.userData.animations) {
      if (keys.right || keys.left || keys.up || keys.down) {
        curPlayer.playerMesh.userData.animations[0].stop();
        curPlayer.playerMesh.userData.animations[1].play();
      } else {
        curPlayer.playerMesh.userData.animations[0].play();
        curPlayer.playerMesh.userData.animations[1].stop();
      }
    }

    mixers.forEach((mixer) => {
      mixer.update(delta);
    });
  });

  return (
    <>
      {players.map((player) => {
        return (
          <primitive
            key={player.id}
            object={player.playerMesh}
            dispose={null}
          />
        );
      })}
    </>
  );
};

export default Player;
