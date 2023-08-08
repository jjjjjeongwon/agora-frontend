import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from "three";

const ImageFrameChild = ({
  glb,
  position,
  scale,
  rotation,
  onLoad = () => {},
}) => {
  const frame = glb.scene.clone().children[0]; // 클론을 사용해 독립적인 객체 생성
  const { scene } = useThree();

  useEffect(() => {
    if (frame) {
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

      if (typeof onLoad === "function") {
        onLoad();
      }
    }
  }, [frame, position, scale, scene, onLoad]);

  if (!frame) return null;

  return (
    <primitive rotation={rotation} object={frame.clone()} dispose={null} />
  );
};

const ImageFrame = () => {
  const glb = useGLTF("../models/imageframe/album_white_width.glb");

  const positions = [
    [-18.6, 11, 5],
    [-5, 9.4, -1.95],
    [-5, 8, -4.15],
    [-5, 13.7, -9.3],
    [5, 11.1, 11.9],
  ];

  const scales = [
    [7, 5, 15],
    [5, 5, 5],
    [5, 5, 5],
    [10, 5, 7.35],
    [7, 5, 15],
  ];
  const rotations = [
    [0, Math.PI / 2, Math.PI / 2],
    [0, 0, Math.PI / 2],
    [0, 0, Math.PI / 2],
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
