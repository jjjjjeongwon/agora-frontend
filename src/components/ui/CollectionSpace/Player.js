import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

function Player({ setMyPlayer, setIsLocked, isLocked }) {
  const { camera, gl } = useThree();
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  // Control 움직임이 일정하게 하기 위해 매번 재할당
  const controlsRef = useRef();
  if (!controlsRef.current) {
    controlsRef.current = new PointerLockControls(camera, gl.domElement);
  }
  const controls = controlsRef.current;

  const handleClick = () => {
    controls.lock();
    setIsLocked(true);
  };

  const handleLock = () => {
    console.log('lock!');
  };

  const handleUnlock = () => {
    console.log('unlock!');
    setIsLocked(false);
  };

  useEffect(() => {
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
    controls.domElement.addEventListener('click', handleClick);

    controls.addEventListener('lock', handleLock);
    controls.addEventListener('unlock', handleUnlock);

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
      controls.domElement.removeEventListener('click', handleClick);
      controls.removeEventListener('lock', handleLock);
      controls.removeEventListener('unlock', handleUnlock);
    };
  }, []);

  useEffect(() => {
    setMyPlayer({ x: camera.position.x, z: camera.position.z });
  }, [camera.position.x, camera.position.y]);

  useFrame(() => {
    if (isLocked) {
      if (keys.up) {
        // velocity.current[2] -= speed;
        controls.moveForward(0.05);
      } else if (keys.down) {
        // velocity.current[2] += speed;
        controls.moveForward(-0.05);
      }
      if (keys.left) {
        // velocity.current[0] -= speed;
        controls.moveRight(-0.05);
      } else if (keys.right) {
        // velocity.current[0] += speed;
        controls.moveRight(0.05);
      }
    }
  });

  return;
}

export default Player;
