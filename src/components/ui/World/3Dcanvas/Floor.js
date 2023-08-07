import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

const Floor = () => {
  return (
    <RigidBody type="fixed" position={[0, -0.5, 0]}>
      <mesh receiveShadow name="floor">
        <cylinderGeometry args={[30, 30, 0.5, 64]} />
        <meshStandardMaterial color={'#B2C78D'} />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
