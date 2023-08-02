import React from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const CollectImage = () => {
  const image = useLoader(THREE.TextureLoader, '../images/test.jpeg');
  const geometry = new THREE.PlaneGeometry(0.85, 1.25);
  const material = new THREE.MeshStandardMaterial({ map: image });
  return (
    <mesh
      position={[-5.38, 3.9, -2.1]}
      rotation={[0, Math.PI / 2, 0]}
      geometry={geometry}
      material={material}
    ></mesh>
  );
};

export default CollectImage;
