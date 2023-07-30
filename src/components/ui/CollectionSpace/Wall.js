import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { Html, Text, Svg } from '@react-three/drei';

const Wall = () => {
  const floorTexture = useLoader(THREE.TextureLoader, '../images/grid.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;

  const frameTexture = useLoader(THREE.TextureLoader, '../images/grass.png');
  return (
    <>
      <mesh
        name="topWall"
        rotation={[0, -Math.PI * 2, 0]}
        position={[0, 3, -6]}
      >
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      <mesh name="bottomWall" rotation={[0, Math.PI, 0]} position={[0, 3, 6]}>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      <mesh
        name="leftWall"
        rotation={[0, Math.PI / 2, 0]}
        position={[-6, 3, 0]}
      >
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      <mesh
        name="rightWall"
        rotation={[0, -Math.PI / 2, 0]}
        position={[6, 3, 0]}
      >
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
    </>
  );
};

export default Wall;
