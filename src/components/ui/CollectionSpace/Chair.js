import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';

const Chair = () => {
  const glb = useGLTF('../models/chair/office_chair.glb');
  const chair = glb.scene.children[0];

  useEffect(() => {
    if (!chair) return;
    glb.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    chair.position.set(-2, 0, -2);
    chair.scale.set(2, 2, 2);
    chair.rotation.z = -Math.PI / 2;
  });
  return <primitive object={chair} dispose={null} />;
};

export default Chair;
