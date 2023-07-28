import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const Floor = () => {
  const floorTexture = useLoader(THREE.TextureLoader, '../images/grid.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.x = 3;
  floorTexture.repeat.y = 3;
  return (
    <mesh castShadow receiveShadow name="floor" rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={floorTexture} />
    </mesh>
  );
};

export default Floor;
