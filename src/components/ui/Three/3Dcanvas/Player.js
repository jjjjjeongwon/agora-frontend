import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { useState, useEffect } from 'react';

const Player = () => {
  const glb = useGLTF('../models/ilbuni.glb');
  const playerMesh = glb.scene.children[0];
  playerMesh.position.y = 0.5;
  const three = useThree();
  const speed = 0.05;
  const [players, setPlayers] = useState([]);
  const [playerMap, setPlayerMap] = useState({});

  const [myId, setMyId] = useState(null);

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

  const renderPlayer = () => {
    // let curPlayer = playerMap[myId];

    if (keys.right) {
      playerMesh.position.x += speed;
    }
    if (keys.left) {
      playerMesh.position.x -= speed;
    }
    if (keys.up) {
      playerMesh.position.z -= speed;
    }
    if (keys.down) {
      playerMesh.position.z += speed;
    }

    // 카메라를 캐릭터가 움직일 때마다 따라 갈 수 있게 하기 + 고정시키기
    // three.camera.position.x = playerMesh.position.x + 1;
    // three.camera.position.z = playerMesh.position.z + 5; // You may want to adjust this to set camera distance from player

    // three.camera.lookAt(playerMesh.position); // Make camera always point to player
    // sendData();
  };

  useEffect(() => {
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    playerMesh.scale.x = 0.5;
    playerMesh.scale.y = 0.5;
    playerMesh.scale.z = 0.5;

    const keyDownHandler = (e) => {
      playerMesh.userData.moving = true;
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
      playerMesh.userData.moving = false;
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
    renderPlayer();
  });
  return <primitive name={'character'} object={glb.scene} dispose={null} />;
};

export default Player;
