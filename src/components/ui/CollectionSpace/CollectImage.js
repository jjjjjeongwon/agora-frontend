import React from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import useTextures from '../../../hooks/useTextures';

const CollectImage = ({ images }) => {
  // console.log(images);
  const textureUrls = [
    images?.[0]?.fileUrl,
    images?.[1]?.fileUrl,
    images?.[2]?.fileUrl,
    images?.[3]?.fileUrl,
    images?.[4]?.fileUrl,
  ].filter(Boolean);

  const textures = useTextures(textureUrls);
  const geometry = new THREE.PlaneGeometry(0.85, 1.25);
  const materials = textures.map(
    (texture) =>
      new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
      })
  );

  const positions = [
    [-1.9, 3.85, 5.368],
    [-5.38, 3.9, -3.05],
    [5.355, 3.25, -3.06],
    [2.15, 3.85, 5.38],
    [2.125, 1.6, 5.373],
  ];

  const rotations = [
    [0, 0, 0],
    [0, Math.PI / 2, 0],
    [0, -Math.PI / 2, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const scales = [
    [2, 1.6, 1],
    [1, 1, 1],
    [3.4, 2.5, 1],
    [2.5, 2, 1],
    [2.2, 0.55, 1],
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
