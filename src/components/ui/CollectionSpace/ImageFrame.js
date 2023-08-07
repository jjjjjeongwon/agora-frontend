import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import * as THREE from 'three';

const ImageFrameChild = ({ glb, position, scale, rotation }) => {
  const frame = glb.scene.clone().children[0]; // 클론을 사용해 독립적인 객체 생성
  const { scene } = useThree();

  useEffect(() => {
    if (!frame) return;
    frame.traverse((child) => {
      if (child.isframe) child.castShadow = true;
    });

    frame.scale.set(...scale);
    frame.position.set(...position);

    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 1.5, 1),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    mesh.castShadow = true;
    scene.add(mesh);
  }, [frame, position, scale, scene]);

  return <primitive rotation={rotation} object={frame} dispose={null} />;
};

const ImageFrame = () => {
  const glb = useGLTF('../models/imageframe/photoframe_blue.glb');

  const positions = [
    [-2, 3.9, 5],
    [2, 3.9, 5],
    [2, 1.6, 5],
    [-5, 3.9, -3.1],
    [5.0, 3.3, -2.9],
  ];

  const scales = [
    [8, 5, 10],
    [10, 5, 12],
    [3, 5, 10],
    [5, 5, 5],
    [12, 5, 15],
  ];
  const rotations = [
    [0, Math.PI / 2, Math.PI / 2],
    [0, Math.PI / 2, Math.PI / 2],
    [0, Math.PI / 2, Math.PI / 2],
    [0, 0, Math.PI / 2],
    [0, -Math.PI, Math.PI / 2],
  ];

  return (
    <>
      {positions.map((position, index) => (
        <ImageFrameChild
          key={index}
          glb={glb}
          position={position}
          scale={scales[index]}
          rotation={rotations[index]}
        />
      ))}
    </>
  );
};

export default ImageFrame;
