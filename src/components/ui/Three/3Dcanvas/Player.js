import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useState, useEffect } from 'react';

// global state
import { useRecoilState } from 'recoil';
import { LoginState, UserState } from '../../../../state/UserAtom';

const Player = ({ socket, roomName }) => {
  // const glb = useGLTF('../models/Bear.glb');
  // const playerMesh = glb.scene.children[0];
  // playerMesh.position.y = 0.7;
  // playerMesh.scale.set(0.5, 0.5, 0.5);
  // const mixer = new THREE.AnimationMixer(playerMesh);
  // const actions = [
  //   mixer.clipAction(glb.scene.animations[0]),
  //   mixer.clipAction(glb.scene.animations[1]),
  // ];
  // playerMesh.userData.animations = actions;

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
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 'skyblue' })
    );
    const newPlayer = { id, cube };
    // const newPlayer = { id, playerMesh };

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
          player.cube.position.x = x;
          player.cube.position.z = z;
        }
        return player;
      });
    });
  };

  const renderPlayer = () => {
    let curPlayer = playerMap[myId];
    console.log('curPlayer : ', curPlayer);
    if (keys.right) {
      curPlayer.cube.position.x += speed;
    }
    if (keys.left) {
      curPlayer.cube.position.x -= speed;
    }
    if (keys.up) {
      curPlayer.cube.position.z -= speed;
    }
    if (keys.down) {
      curPlayer.cube.position.z += speed;
    }

    sendData(curPlayer.cube.position.x, curPlayer.cube.position.z);
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
        socket.emit('send_location', data);
      }
    }
  };

  useEffect(() => {
    // glb.scene.traverse((child) => {
    //   if (child.isMesh) {
    //     child.castShadow = true;
    //   }
    // });
    socket.on('join_user', (data) => {
      console.log('join_user', data);
      console.log(data);
      joinUser(data.id, data.x, data.z);
    });

    socket.on('bye', (data) => {
      leaveUser(data);
    });

    socket.on('update_state', (data) => {
      console.log('update_state', data);
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
  // useFrame((state, delta) => {
  // TODO 이곳에서 이동로직 처리
  // mixer.update(delta);
  // if (isMoving) {
  //   playerMesh.userData.animations[0].stop();
  //   playerMesh.userData.animations[1].play();
  // } else {
  //   playerMesh.userData.animations[0].play();
  //   playerMesh.userData.animations[1].stop();
  // }
  // });
  return (
    <>
      {players.map((player) => {
        return (
          <primitive key={player.id} object={player.cube} dispose={null} />
        );
      })}
    </>
  );
  // return <primitive key={players.id} object={players} dispose={null} />;
  // return <primitive key={players.id} object={glb.scene} dispose={null} />;
};

export default Player;
