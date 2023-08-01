import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const ImageFrame = () => {
  const glb = useGLTF('../models/imageframe/photoframe_blue.glb');
  const frame = glb.scene.children[0];
  const { scene } = useThree();

  useEffect(() => {
    if (!frame) return;
    glb.scene.traverse((child) => {
      if (child.isframe) child.castShadow = true;
    });
    frame.scale.x = 5;
    frame.scale.y = 5;
    frame.scale.z = 5;

    const mesh = new THREE.Mesh(
      new BoxGeometry(0.2, 1.5, 1),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    frame.position.x = -5;
    frame.position.y = 3.9;
    frame.position.z = -3.1;

    mesh.castShadow = true;
    mesh.position.x = -5.4;
    mesh.position.y = 4;
    mesh.position.z = -3.1;
    scene.add(mesh);
  });
  return (
    <>
      <primitive rotation={[0, 0, Math.PI / 2]} object={frame} dispose={null} />
    </>
  );
};

export default ImageFrame;
