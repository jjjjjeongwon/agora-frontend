import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
useGLTF.preload('../models/ilbuni.glb');
function Player({ setMyPlayer, setIsLocked, isLocked }) {
  const { camera, gl, scene } = useThree();

  const glb = useGLTF('../models/ilbuni.glb');
  const model = useRef(glb.scene);
  model.current.position.y = 0.5;

  const controlsRef = useRef();
  if (!controlsRef.current) {
    controlsRef.current = new OrbitControls(camera, gl.domElement);
    controlsRef.current.enableDamping = true;
    controlsRef.current.minDistance = 5;
    controlsRef.current.maxDistance = 15;
    controlsRef.current.enablePan = false;
    controlsRef.current.maxPolarAngle = Math.PI / 2 - 0.05;
  }

  const controls = controlsRef.current;

  const walkDirection = new THREE.Vector3();
  const rotateAngle = new THREE.Vector3(0, 1, 0);
  const rotateQuarternion = new THREE.Quaternion();
  const cameraTarget = new THREE.Vector3();

  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const [isPressed, setIsPressed] = useState(false);

  // culling 효과 true
  camera.frustumCulled = true;

  const mixerRef = useRef(null);

  // raycaster
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const checkIntersects = () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (const item of intersects) {
      console.log(item.object.name);
    }
  };

  const handleClick = (e) => {
    checkIntersects();
  };

  const updateCameraTarget = (moveX, moveZ) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;

    cameraTarget.x = model.current.position.x;
    cameraTarget.y = model.current.position.y + 1;
    cameraTarget.z = model.current.position.z;
    controls.target = cameraTarget;
  };

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
        directionOffset = -Math.PI / 4 - Math.PI / 2;
      } else {
        directionOffset = Math.PI;
      }
    } else if (keys.left) {
      directionOffset = Math.PI / 2;
    } else if (keys.right) {
      directionOffset = -Math.PI / 2;
    }
    return directionOffset;
  };

  useEffect(() => {
    if (model.current) {
      mixerRef.current = new THREE.AnimationMixer(model.current);
      const actionIdle = mixerRef.current.clipAction(glb.animations[0]);
      const actionWalk = mixerRef.current.clipAction(glb.animations[1]);

      model.current.animations = [actionIdle, actionWalk];
    }
  }, [model, glb]);

  useEffect(() => {
    if (!model.current) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

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
    // mixerRef.current.update(delta);
    if (isPressed) {
      model.current.animations[1].play(); // start walk animation
      model.current.animations[0].stop(); // stop idle animation

      let angleYCameraDirection = Math.atan2(
        camera.position.x - model.current.position.x,
        camera.position.z - model.current.position.z
      );
      let directionOffset = DirectionOffset(keys);
      rotateQuarternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + directionOffset
      );
      model.current.quaternion.rotateTowards(rotateQuarternion, 0.2);
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, directionOffset);

      const moveX = walkDirection.x * 0.05;
      const moveZ = walkDirection.z * 0.05;
      model.current.position.x += moveX;
      model.current.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);
    } else {
      model.current.animations[0].play(); // start idle animation
      model.current.animations[1].stop(); // stop walk animation
    }
  });
  return <primitive object={model.current} dispose={null} />;
}

export default Player;
