import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const Wall = () => {
  const floorTexture = useLoader(THREE.TextureLoader, '../images/grid.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.x = 1;
  floorTexture.repeat.y = 1;
  return (
    <>
      <mesh
        name="topWall"
        rotation={[0, -Math.PI * 2, 0]}
        position={[0, 1.5, -4]}
      >
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      <mesh name="bottomWall" rotation={[0, Math.PI, 0]} position={[0, 1.5, 4]}>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      <mesh
        name="leftWall"
        rotation={[0, Math.PI / 2, 0]}
        position={[-4, 1.5, 0]}
      >
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      <mesh
        name="rightWall"
        rotation={[0, -Math.PI / 2, 0]}
        position={[4, 1.5, 0]}
      >
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
    </>
  );
};

export default Wall;
