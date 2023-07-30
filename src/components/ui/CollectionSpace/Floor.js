import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Floor = () => {
  const floorTexture = useLoader(
    THREE.TextureLoader,
    '../images/herringbone.jpg'
  );

  const topTexture = useLoader(THREE.TextureLoader, '../images/grid.png');
  // floorTexture.wrapS = THREE.RepeatWrapping;
  // floorTexture.wrapT = THREE.RepeatWrapping;
  // floorTexture.repeat.x = 5;
  // floorTexture.repeat.y = 5;
  return (
    <>
      <mesh
        castShadow
        receiveShadow
        name="floor"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      <mesh name="top" rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial map={topTexture} />;
      </mesh>
    </>
  );
};

export default Floor;
