import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

function Player({ setMyPlayer, setIsLocked, isLocked }) {
  const { camera, gl, scene, clock } = useThree();
  camera.frustumCulled = true;
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // raycaster
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // player speed
  const speed = 0.1;

  // Control 움직임이 일정하게 하기 위해 매번 재할당
  const controlsRef = useRef();
  if (!controlsRef.current) {
    controlsRef.current = new PointerLockControls(camera, gl.domElement);
  }
  const controls = controlsRef.current;

  const checkIntersects = () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (const item of intersects) {
      console.log(item.object.name);
      break;
    }
  };

  const handleClick = (e) => {
    controls.lock();
    mouse.x = 0;
    mouse.y = 0;
    console.log(mouse.x, mouse.y);
    checkIntersects();
    setIsLocked(true);
  };

  const handleLock = () => {
    console.log('lock!');
  };

  const handleUnlock = () => {
    console.log('unlock!');
    setIsLocked(false);
  };
  console.log(camera.position);

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

  useFrame((delta) => {
    if (isLocked) {
      if (keys.up) {
        controls.moveForward(speed);
      } else if (keys.down) {
        controls.moveForward(-speed);
      }
      if (keys.left) {
        controls.moveRight(-speed);
      } else if (keys.right) {
        controls.moveRight(speed);
      }
    }
  });

  return;
}

export default Player;
