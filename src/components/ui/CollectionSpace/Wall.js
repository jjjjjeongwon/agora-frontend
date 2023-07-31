import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { Html, Text, Svg } from '@react-three/drei';
const Wall = () => {
  const floorTexture = useLoader(THREE.TextureLoader, '../images/grid.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;

  const geometry = new THREE.BoxGeometry(12, 6, 1);
  const material = new THREE.MeshStandardMaterial({
    color: '#D39C8A',
    side: THREE.DoubleSide,
  });
  return (
    <>
      <mesh
        name="topWall"
        rotation={[0, -Math.PI * 2, 0]}
        position={[0, 3, -6]}
        geometry={geometry}
        material={material}
      ></mesh>
      <mesh
        name="bottomWall"
        rotation={[0, Math.PI, 0]}
        position={[0, 3, 6]}
        geometry={geometry}
        material={material}
      ></mesh>
      <mesh
        name="leftWall"
        rotation={[0, Math.PI / 2, 0]}
        position={[-6, 3, 0]}
        geometry={geometry}
        material={material}
      ></mesh>
      <mesh
        name="rightWall"
        rotation={[0, -Math.PI / 2, 0]}
        position={[6, 3, 0]}
        geometry={geometry}
        material={material}
      ></mesh>
    </>
  );
};

export default Wall;
