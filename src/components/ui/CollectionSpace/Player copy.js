import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

useGLTF.preload('./models/ilbuni.glb');
function Player({ setMyPlayer, setIsLocked, isLocked }) {
  const { camera, gl, scene } = useThree();

  const glb = useGLTF('./models/ilbuni.glb');
  const model = glb.scene.children[0];

  const mixer = new THREE.AnimationMixer(glb);
  const actions = [
    mixer.clipAction(glb.animations[0]),
    mixer.clipAction(glb.animations[1]),
  ];

  const walkDirection = new THREE.Vector3();
  const rotateAngle = new THREE.Vector3(0, 1, 0);
  const rotateQuarternion = new THREE.Quaternion();
  const cameraTarget = new THREE.Vector3();

  const fadeDuration = 0.2;
  const walkVelocity = 2;

  // culling 효과 true
  camera.frustumCulled = true;
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const [isPressed, setIsPressed] = useState(false);

  // raycaster
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // player speed
  const speed = 0.1;

  const checkIntersects = () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (const item of intersects) {
      console.log(item.object.name);
    }
  };

  const handleClick = (e) => {
    mouse.x = 0;
    mouse.y = 0;
    console.log(mouse.x, mouse.y);
    checkIntersects();
  };

  useEffect(() => {
    if (!model) return;
    model.traverse((child) => {
      if (child.isMesh) {
        console.log('성공');
        child.castShadow = true;
      }
    });
    model.animations = actions;
    const keyDownHandler = (e) => {
      switch (e.code) {
        case 'ArrowRight':
        case 'KeyD':
          setKeys((keys) => ({ ...keys, right: true }));
          setIsPressed(true);
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setKeys((keys) => ({ ...keys, left: true }));
          setIsPressed(true);
          break;
        case 'ArrowDown':
        case 'KeyS':
          setKeys((keys) => ({ ...keys, down: true }));
          setIsPressed(true);
          break;
        case 'ArrowUp':
        case 'KeyW':
          setKeys((keys) => ({ ...keys, up: true }));
          setIsPressed(true);
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
          setIsPressed(false);
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setKeys((keys) => ({ ...keys, left: false }));
          setIsPressed(false);
          break;
        case 'ArrowDown':
        case 'KeyS':
          setKeys((keys) => ({ ...keys, down: false }));
          setIsPressed(false);
          break;
        case 'ArrowUp':
        case 'KeyW':
          setKeys((keys) => ({ ...keys, up: false }));
          setIsPressed(false);
          break;
        default:
          break;
      }
    };
    gl.domElement.addEventListener('click', handleClick);

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
      gl.domElement.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    setMyPlayer({ x: camera.position.x, z: camera.position.z });
  }, [camera.position.x, camera.position.y]);

  useFrame((delta) => {
    if (!model) return;
    mixer.update(delta);
    if (isPressed) {
      let angleTCameraDirection = Math.atan2(
        camera.position.x - model.position.x,
        camera.position.z - model.position.z
      );
      let directionOffset = DirectionOffset(keys);
    }
  });

  return <primitive object={model} dispose={null} />;
}

const DirectionOffset = (keys) => {
  let directionOffset = 0;
  if (keys.up) {
    if (keys.left) {
      directionOffset = Math.PI / 4;
    } else if (keys.right) {
      directionOffset = -Math.PI / 4;
    }
  } else if (keys.down) {
    if (keys.left) {
      directionOffset = Math.PI / 4 + Math.PI / 2;
    } else if (keys.right) {
      directionOffset = -Math.PI / 4 + Math.PI / 2;
    }
  } else if (keys.left) {
    directionOffset = Math.PI / 2;
  } else if (keys.right) {
    directionOffset = -Math.PI / 2;
  }
  console.log('okay');
  return directionOffset;
};

export default Player;
