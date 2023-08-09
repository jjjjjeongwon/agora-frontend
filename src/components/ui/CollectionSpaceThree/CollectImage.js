import React from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import useTextures from '../../../hooks/useTextures';

const CollectImage = ({ images }) => {
  // const urls = images.map((img) => img.fileUrl);
  // const textures = useTextures(urls);

  const textureUrls = [
    images?.[0]?.fileUrl,
    images?.[1]?.fileUrl,
    images?.[2]?.fileUrl,
    images?.[3]?.fileUrl,
    images?.[4]?.fileUrl,
  ].filter(Boolean);

  const textures = useTextures(textureUrls);

  // const textures = [
  //   useLoader(THREE.TextureLoader, `${images[0]?.fileUrl}`),
  //   useLoader(THREE.TextureLoader, `${images[1]?.fileUrl}`),
  //   useLoader(THREE.TextureLoader, `${images[2]?.fileUrl}`),
  //   useLoader(THREE.TextureLoader, `${images[3]?.fileUrl}`),
  //   useLoader(THREE.TextureLoader, `${images[4]?.fileUrl}`),
  // ];
  const geometry = new THREE.PlaneGeometry(0.85, 1.25);
  const materials = textures.map(
    (texture) =>
      new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
      })
  );

  const positions = [
    [5.38, 3.93, -3],
    [-5.38, 2.9, 0.8],
    [-5.38, 4.3, 3],
    [-5.38, 3.5, -2],
    [-3.7, 3.8, 5.38],
  ];

  const rotations = [
    [0, -Math.PI / 2, 0],
    [0, Math.PI / 2, 0],
    [0, Math.PI / 2, 0],
    [0, Math.PI / 2, 0],
    [0, Math.PI, 0],
  ];

  const scales = [
    [2.95, 1.25, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1.5, 2, 1],
    [3.1, 1.3, 1],
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
