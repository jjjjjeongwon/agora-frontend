import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const Floor = () => {
  const floorTexture = useLoader(THREE.TextureLoader, '../images/grid.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.x = 4;
  floorTexture.repeat.y = 4;
  return (
    <mesh
      castShadow
      receiveShadow
      name="floor"
      position={[0, -0.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <boxGeometry args={[40, 40, 1]} />
      <meshStandardMaterial map={floorTexture} />
    </mesh>
  );
};

export default Floor;
