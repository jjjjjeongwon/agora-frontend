import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const Floor = () => {
  return (
    <mesh
      castShadow
      receiveShadow
      name="floor"
      position={[0, -0.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <boxGeometry args={[46, 56, 1]} />
      <meshStandardMaterial color={'#B2C78D'} />
    </mesh>
  );
};

export default Floor;
