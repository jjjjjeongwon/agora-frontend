import { Preload, useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { CapsuleCollider, RigidBody, vec3 } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import { Controls } from '../../../pages/World';
import Character from './Character';
import * as THREE from 'three';

const JUMP_FORCE = 0.75;
const MOVEMENT_SPEED = 0.1;
const MAX_VEL = 3;
const RUN_VEL = 1.5;

export const CharacterController = ({ setMyPlayer, friendModalOpen }) => {
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );
  const rigidbody = useRef();
  const isOnFloor = useRef(true);
  const [moveState, setMoveState] = useState('Idle');
  const [isPressed, setIsPressed] = useState(false);
  const [resetState, setResetState] = useState(false);

  useFrame((state, delta) => {
    if (!rigidbody.current) return;
    const impulse = { x: 0, y: 0, z: 0 };
    const linvel = rigidbody.current.linvel();
    let changeRotation = false;
    if (!friendModalOpen) {
      // Character Movement
      if (jumpPressed && isOnFloor.current) {
        impulse.y += JUMP_FORCE;
        isOnFloor.current = false;
      }
      if (rightPressed && linvel.x < MAX_VEL) {
        impulse.x += MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (leftPressed && linvel.x > -MAX_VEL) {
        impulse.x -= MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (backPressed && linvel.z < MAX_VEL) {
        impulse.z += MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (forwardPressed && linvel.z > -MAX_VEL) {
        impulse.z -= MOVEMENT_SPEED;
        changeRotation = true;
      }

      rigidbody.current.applyImpulse(impulse, true);
      if (changeRotation) {
        const angle = Math.atan2(linvel.x, linvel.z);
        character.current.rotation.y = angle;
      }
    }

    if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
      if (moveState !== 'Run') {
        setMoveState('Run');
        setIsPressed(true);
      }
    } else {
      if (moveState !== 'Idle') {
        setMoveState('Idle');
        setIsPressed(false);
      }
    }

    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      character.current.rotation.y = angle;
    }

    // Camera Follow
    const characterWorldPosition = character.current.getWorldPosition(
      new THREE.Vector3()
    );

    const targetCameraPosition = new THREE.Vector3(
      characterWorldPosition.x,
      characterWorldPosition.y + 7,
      characterWorldPosition.z + 10
    );

    // setMyPlayer({ x: characterWorldPosition.x, z: characterWorldPosition.z });
    // console.log(characterWorldPosition.x, characterWorldPosition.z);
    state.camera.position.lerp(targetCameraPosition, delta * 2);

    if (characterWorldPosition.y <= -15) {
      setResetState(true);
    }
  });

  const character = useRef();

  useEffect(() => {
    if (resetState) {
      rigidbody.current.setTranslation(vec3({ x: 0, y: 3, z: 26 }));
      rigidbody.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }));
      setResetState(false);
    }
  }, [resetState]);

  useEffect(() => {
    const characterWorldPosition = character.current.getWorldPosition(
      new THREE.Vector3()
    );
    setMyPlayer({ x: characterWorldPosition.x, z: characterWorldPosition.z });
  }, [isPressed]);

  return (
    <group>
      <RigidBody
        position-y={3}
        position={[0, 0, 26]}
        ref={rigidbody}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloor.current = true;
        }}
      >
        <CapsuleCollider args={[0.9, 0.4]} position={[0, 0.9, 0]} />
        <group ref={character}>
          <Character moveState={moveState} isPressed={isPressed} />
        </group>
      </RigidBody>
      <Preload add />
    </group>
  );
};
