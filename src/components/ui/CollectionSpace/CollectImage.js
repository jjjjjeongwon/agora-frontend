import React from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const CollectImage = () => {
  const image = useLoader(THREE.TextureLoader, '../images/test.jpeg');
  const geometry = new THREE.PlaneGeometry(0.85, 1.25);
  const material = new THREE.MeshStandardMaterial({
    map: image,
    side: THREE.DoubleSide,
  });

  return (
    <>
      {/* 침대쪽 */}
      <mesh
        position={[-5.38, 3.9, -3.05]}
        rotation={[0, Math.PI / 2, 0]}
        geometry={geometry}
        material={material}
      ></mesh>

      {/* 침대 반대쪽 */}
      <mesh
        position={[5.3, 2.9, -3.05]}
        rotation={[0, Math.PI / 2, 0]}
        geometry={geometry}
        scale={[4, 3.3, 1]}
        material={material}
      ></mesh>

      {/* 침대 옆 */}
      <mesh
        position={[3.5, 4, 5.45]}
        rotation={[0, 0, 0]}
        scale={[3, 2.3, 1]}
        geometry={geometry}
        material={material}
      ></mesh>
      <mesh
        position={[0.8, 3.2, 5.45]}
        rotation={[0, 0, 0]}
        scale={[2, 2.4, 1]}
        geometry={geometry}
        material={material}
      ></mesh>
      <mesh
        position={[3.5, 1.6, 5.45]}
        rotation={[0, 0, 0]}
        scale={[2.5, 0.7, 1]}
        geometry={geometry}
        material={material}
      ></mesh>
      {/* <mesh
        position={[2.8, 2, 5.45]}
        rotation={[0, 0, 0]}
        scale={[1.5, 0.8, 1]}
        geometry={geometry}
        material={material}
      ></mesh> */}
    </>
  );
};

export default CollectImage;
