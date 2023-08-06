import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

const Floor = () => {
  return (
    <RigidBody
      type="fixed"
      position={[0, -0.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <mesh receiveShadow name="floor">
        <boxGeometry args={[46, 56, 1]} />
        <meshStandardMaterial color={'#B2C78D'} />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
