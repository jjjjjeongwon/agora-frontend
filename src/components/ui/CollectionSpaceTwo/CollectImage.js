import React from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import useTextures from '../../../hooks/useTextures';

const CollectImage = ({ images }) => {
  const textureUrls = [
    images?.[0]?.fileUrl,
    images?.[1]?.fileUrl,
    images?.[2]?.fileUrl,
    images?.[3]?.fileUrl,
    images?.[4]?.fileUrl,
  ].filter(Boolean);

  const textures = useTextures(textureUrls);
  // const image = useLoader(THREE.TextureLoader, "../images/room1_4.png");
  // const image2 = useLoader(THREE.TextureLoader, "../images/room2_1.png");
  // const image3 = useLoader(THREE.TextureLoader, "../images/room2_2.png");
  // const image4 = useLoader(THREE.TextureLoader, "../images/room3_1.png");
  // const image5 = useLoader(THREE.TextureLoader, "../images/room1_2.png");

  const geometry = new THREE.PlaneGeometry(0.85, 1.25);
  const materials = textures.map(
    (texture) =>
      new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
      })
  );

  const positions = [
    [-5.38, 3.9, -3.05],
    [5.367, 3.3, -3.1],
    [-3.05, 4.2, 5.382],
    [-5.38, 4, -0.1],
    [-5.382, 4.2, 3.425],
  ];

  const rotations = [
    [0, Math.PI / 2, 0],
    [0, -Math.PI / 2, 0],
    [0, Math.PI, 0],
    [0, Math.PI / 2, 0],
    [0, Math.PI / 2, 0],
  ];

  const scales = [
    [1, 1, 1],
    [3, 2.4, 1],
    [2.1, 1.6, 1],
    [2.4, 2, 1],
    [1.965, 1, 1],
  ];

  return (
    <>
      {positions.map((position, index) => (
        <mesh
          name={images?.[index]?._id}
          key={index}
          position={position}
          rotation={rotations[index]}
          scale={scales[index]}
          geometry={geometry}
          material={materials[index]}
        />
      ))}
    </>
  );
};

export default CollectImage;
