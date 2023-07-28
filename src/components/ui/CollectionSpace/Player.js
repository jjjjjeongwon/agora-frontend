import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

function Player() {
  const { camera, gl } = useThree();
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const [isLocked, setIsLocked] = useState(false);

  const velocity = useRef([0, 0, 0]);
  const playerRef = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 'black' })
  );
  const player = useRef(playerRef);

  // Control 움직임이 일정하게 하기 위해 매번 재할당
  const controlsRef = useRef();
  if (!controlsRef.current) {
    controlsRef.current = new PointerLockControls(camera, gl.domElement);
  }
  const controls = controlsRef.current;

  const speed = 0.01;
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
    controls.domElement.addEventListener('click', () => {
      controls.lock();
      setIsLocked(true);
    });
    controls.addEventListener('lock', () => {
      console.log('lock!');
    });
    controls.addEventListener('unlock', () => {
      console.log('unlock!');
      setIsLocked(false);
    });

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

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
    //   camera.position.x = player.current.position.x;
    //   camera.position.y = player.current.position.y + 4;
    //   camera.position.z = player.current.position.z + 7;

    // camera.lookAt(player.current.position);

    player.current.translateX(velocity.current[0]);
    player.current.translateZ(velocity.current[2]);

    // friction
    velocity.current[0] *= 0.9;
    velocity.current[2] *= 0.9;
  });

  return <primitive object={player.current} dispose={null} />;
}

export default Player;
