import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const Floor = () => {
  const floorTexture = useLoader(THREE.TextureLoader, '../images/grid.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.x = 1;
  floorTexture.repeat.y = 1;
  return (
    <>
      <mesh
        castShadow
        receiveShadow
        name="floor"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      <mesh name="top" rotation={[Math.PI / 2, 0, 0]} position={[0, 3, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
    </>
  );
};

export default Floor;
