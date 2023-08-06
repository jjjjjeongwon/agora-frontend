import { Preload, useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import { Controls } from '../../../pages/World';
import Character from './Character';
import * as THREE from 'three';

const JUMP_FORCE = 0.75;
const MOVEMENT_SPEED = 0.1;
const MAX_VEL = 3;
const RUN_VEL = 1.5;

export const CharacterController = ({ setMyPlayer }) => {
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );
  const character = useRef();
  const rigidbody = useRef();
  const isOnFloor = useRef(true);
  const [moveState, setMoveState] = useState('Idle');

  useEffect(() => {
    if (!rigidbody) return;
  }, []);
  useFrame((state, delta) => {
    // Character Movement
    const impulse = { x: 0, y: 0, z: 0 };
    if (jumpPressed && isOnFloor.current) {
      impulse.y += JUMP_FORCE;
      isOnFloor.current = false;
    }
    const linvel = rigidbody.current.linvel();
    let changeRotation = false;
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

    if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
      if (moveState !== 'Run') {
        setMoveState('Run');
      }
    } else {
      if (moveState !== 'Idle') {
        setMoveState('Idle');
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
      characterWorldPosition.y + 10,
      characterWorldPosition.z + 25
    );

    setMyPlayer({ x: characterWorldPosition.x, z: characterWorldPosition.z });

    state.camera.position.lerp(targetCameraPosition, delta * 2);
  });

  return (
    <group>
      <RigidBody
        position-y={3}
        position={[0, 0, 24]}
        ref={rigidbody}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloor.current = true;
        }}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={character}>
          <Character moveState={moveState} />
        </group>
      </RigidBody>
      <Preload add />
    </group>
  );
};
