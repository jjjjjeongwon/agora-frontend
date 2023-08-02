import React from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const CollectImage = () => {
  const image = useLoader(THREE.TextureLoader, '../images/room3_2.png');
  const image2 = useLoader(THREE.TextureLoader, '../images/room3_1.png');
  const image3 = useLoader(THREE.TextureLoader, '../images/room3_6.png');
  const image4 = useLoader(THREE.TextureLoader, '../images/room3_3.png');
  const image5 = useLoader(THREE.TextureLoader, '../images/room3_5.png');
  const geometry = new THREE.PlaneGeometry(0.85, 1.25);
  const material = new THREE.MeshStandardMaterial({
    map: image,
    side: THREE.DoubleSide,
  });
  const material2 = new THREE.MeshStandardMaterial({
    map: image2,
    side: THREE.DoubleSide,
  });
  const material3 = new THREE.MeshStandardMaterial({
    map: image3,
    side: THREE.DoubleSide,
  });
  const material4 = new THREE.MeshStandardMaterial({
    map: image4,
    side: THREE.DoubleSide,
  });
  const material5 = new THREE.MeshStandardMaterial({
    map: image5,
    side: THREE.DoubleSide,
  });
  return (
    <>
      <mesh
        position={[5.3, 4.0, -3]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[3, 1.5, 1]}
        geometry={geometry}
        material={material2}
      ></mesh>
      <mesh
        position={[-5.38, 2.9, 0.8]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1, 1]}
        geometry={geometry}
        material={material3}
      ></mesh>
      <mesh
        position={[-5.38, 4.3, 3]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1, 1]}
        geometry={geometry}
        material={material4}
      ></mesh>
      <mesh
        position={[-5.38, 3.5, -2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1.5, 2, 1]}
        geometry={geometry}
        material={material}
      ></mesh>
      <mesh
        position={[-3.7, 4, 5.4]}
        rotation={[0, Math.PI, 0]}
        scale={[4, 1.5, 1]}
        geometry={geometry}
        material={material5}
      ></mesh>
    </>
  );
};

export default CollectImage;
