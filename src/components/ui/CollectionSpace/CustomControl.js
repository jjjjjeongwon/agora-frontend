import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useState, useEffect, useRef } from 'react';
const CustomControl = () => {
  const controlRef = useRef();
  const { three, camera } = useThree();
  const [keys, setKeys] = useState({
    right: false,
    left: false,
    up: false,
    down: false,
  });
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
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);
  useFrame(() => {
    if (keys.up) {
      controlRef.moveForward(0.02);
    }
    if (keys.down) {
      controlRef.moveForward(-0.02);
    }
    if (keys.right) {
      controlRef.moveRight(0.02);
    }
    if (keys.left) {
      controlRef.moveRight(-0.02);
    }
  }, []);
  return <PointerLockControls ref={controlRef} args={camera} />;
};

export default CustomControl;
